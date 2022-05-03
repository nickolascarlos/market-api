import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
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
      throw new NotFoundException('User not found');
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
    await user.remove();
    return 'removed';
  }

  getByCredentials(email: string, password: string) {
    return User.findOne({
      email,
      password: crypto.createHash('sha256').update(password).digest('hex'),
    });
  }

  async changePassword(
    payload: UpdateUserPasswordDto,
    userId: string,
    adminAction = false,
  ) {
    // Se não for uma solicitação de um administrador,
    // as seguintes verificações devem ser feitas
    if (!adminAction) {
      // Verifica se currentPassword de fato corresponde à senha atual do usuário logado
      const hashedCurrentPassword = crypto
        .createHash('sha256')
        .update(payload.currentPassword)
        .digest('hex');

      const user: User = await User.findOne({
        where: {
          id: userId,
          password: hashedCurrentPassword,
        },
      });

      if (!user) {
        throw new UnauthorizedException(
          'The provided currentPassword does not match the actual current password',
        );
      }
    }

    // Se as senhas corresponderem (ou for uma solicitação
    // do administrador), atualiza a senha
    const hashedNewPassword = crypto
      .createHash('sha256')
      .update(payload.newPassword)
      .digest('hex');

    await User.createQueryBuilder('user')
      .update()
      .set({ password: hashedNewPassword })
      .where('id = :id', { id: userId })
      .execute();

    return 'updated';
  }

  // Esse método se diferencia de .findOne(...) por
  // fazer uma verificação para permitir apenas que
  // o próprio usuário (ou um administrador) acesse
  // suas informações
  async selfUserRestrictFindOne(id: string, user: any) {
    const { userId, userRole } = user;

    if (userId === id || userRole === 'admin') // eslint-disable-line
      return await this.findOne(id, true);

    throw new UnauthorizedException();
  }
}
