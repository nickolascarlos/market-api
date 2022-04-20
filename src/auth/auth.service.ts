import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { maxDate } from 'class-validator';

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

    return {
      token: await this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
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
    const me: User = await User.findOne(req.user.id, {
      relations: ['providers']
    });
    return me;
  }
}
