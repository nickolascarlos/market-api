import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { isNotExpired, validateEmail } from 'src/utilities';
import { RequestPasswordChangeDto } from './dto/request-password-change.dto';
import { PasswordChangeToken } from './entities/password-change-token.entity';
import { MailService } from 'src/mail/mail.service';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { __ } from 'src/translatorInstance';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = new User();
    Object.assign(newUser, {
      ...payload,
      password: crypto
        .createHash('sha256')
        .update(payload.password)
        .digest('hex'),
    });
    await newUser.save();
    delete newUser.password;
    return newUser;
  }

  async findUserProviders(
    loggedInUserId: string,
    offset = 0,
    limit = Infinity,
  ) {
    const loggedInUser: User = await this.findOne(loggedInUserId);
    return await Provider.find({
      where: {
        user: loggedInUser,
      },
      skip: offset,
      take: limit,
    });
  }

  findAll(offset: number, limit: number) {
    return User.find({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: string, includeProviders = false) {
    return User.findOneOrFail(id, {
      relations: [...(includeProviders ? ['providers'] : [])],
    }).catch(() => {
      throw new NotFoundException(__('User not found'));
    });
  }

  async update(id: string, payload: UpdateUserDto) {
    const user: User = await this.findOne(id);
    Object.assign(user, payload);
    await user.save();
    return user;
  }

  async remove(id: string) {
    const user: User = await this.findOne(id);
    if (user.role === 'admin')
      throw new ForbiddenException(__('An admin account cannot be deleted'));
    await user.remove();
  }

  getByCredentials(email: string, password: string) {
    return User.findOne({
      email: ILike(email),
      password: crypto.createHash('sha256').update(password).digest('hex'),
    });
  }

  async changePassword(
    payload: UpdateUserPasswordDto,
    userId: string = null,
    adminAction = false,
  ) {
    const hashedNewPassword = crypto
      .createHash('sha256')
      .update(payload.newPassword)
      .digest('hex');

    // Se não for uma solicitação de um administrador,
    // as seguintes verificações devem ser feitas
    if (!adminAction) {
      // Verifica se o token é válido
      const token: PasswordChangeToken =
        await PasswordChangeToken.findOneOrFail(payload.token, {
          relations: ['user'],
        }).catch(() => null);

      if (!token)
        throw new BadRequestException(
          __('Provided token is not valid or was already used'),
        );

      if (!isNotExpired(token.expiresIn * 1000))
        throw new BadRequestException(__('Provided token is expired'));

      await User.createQueryBuilder('user')
        .update()
        .set({ password: hashedNewPassword })
        .where('id = :id', { id: token.user.id })
        .execute();

      await token.remove();
    } else {
      // Se for uma solicitação de administrador
      if (!userId || userId.length === 0)
        throw new BadRequestException(__('A user must be specified'));

      await User.createQueryBuilder('user')
        .update()
        .set({ password: hashedNewPassword })
        .where('id = :id', { id: userId })
        .execute();
    }

    return 'updated';
  }

  async requestPasswordChange(payload: RequestPasswordChangeDto) {
    const user: User = await User.findOne({
      where: {
        email: ILike(payload.email),
      },
    });

    if (user) {
      const token = await crypto.randomBytes(20).toString('hex');

      const pcToken: PasswordChangeToken = new PasswordChangeToken();
      pcToken.token = token;
      pcToken.expiresIn = Math.floor(new Date().getTime() / 1000) + 600;
      pcToken.user = user;
      await pcToken.save();

      await this.mailService.sendPasswordResetToken(
        token,
        user.email,
        `${user.firstName} ${user.lastName}`,
      );
    }
  }

  async checkEmailAvailability(email: string) {
    // Verifica se se trata de um email válido
    if (!validateEmail(email))
      throw new BadRequestException(__('Provided email is not valid'));

    const user: User = await User.findOne({
      where: {
        email: ILike(email),
      },
    });

    return {
      available: !user,
    };
  }
}
