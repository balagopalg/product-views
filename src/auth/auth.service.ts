import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninInput, SignupInput } from './dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable({})
export class AuthService {
  constructor(private prisma: DatabaseService) {}
  async signup(data: SignupInput) {
    try {
      const checkUser = await this.prisma.user.findMany({
        where: { email: data.email },
      });
      console.log('checkUSer', checkUser, data);
      if (!checkUser.length) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        console.log('hash', hashedPassword);
        const user = await this.prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            is_active: true,
            password_hash: hashedPassword,
          },
        });
        console.log(user);
        delete user.password_hash;
        return user;
      } else {
        throw new ForbiddenException('User Exist');
      }
    } catch (err) {
      console.log(err, 'ERROR');
      throw new ForbiddenException('User Exist');
    }
  }

  async signIn(data: SigninInput) {
    try {
      console.log('DATAG', data);
      const checkUser = await this.prisma.user.findMany({
        where: { email: data.email },
      });
      if (checkUser.length) {
        const isCorrect = await bcrypt.compare(
          data.password,
          checkUser[0].password_hash,
        );
        if (isCorrect) {
          delete checkUser[0].password_hash;
          const response = { ...checkUser[0], message: 'Login Successful' };
          return response;
        } else {
          throw new ForbiddenException('Incorrect password');
        }
      } else {
        throw new ForbiddenException("User Doesn't Exist");
      }
    } catch (err) {
      console.log(err, 'ERROR');
      throw new ForbiddenException(
        err?.response?.message ?? `Unexpecter Error ${err}`,
      );
    }
  }
}
