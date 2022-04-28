import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(req) {
    const { user } = req;

    if (!user) throw new UnauthorizedException();

    const token = await this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET },
    );

    const userData = await User.findOne(user.id, {
      relations: ['providers'],
    });

    // Omite o campo user_id (redundantes) dos providers
    userData.providers = userData.providers.map((provider) => {
      return _.omit(provider, ['user_id']);
    });

    return {
      token,
      user: userData,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.userService.getByCredentials(email, password);
  }

  async tick(req) {
    const now: number = Math.round(new Date().getTime() / 1000);
    const tokenExp: number = req.user.exp;
    return {
      expiresIn: tokenExp - now,
      timeUnit: 'seconds',
    };
  }

  async me(req) {
    const me: User = await this.userService.findOne(req.user.userId);
    return me;
  }
}
