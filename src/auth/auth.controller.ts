import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninInput, SignupInput } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupInput) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signuin(@Body() dto: SigninInput) {
    return this.authService.signIn(dto);
  }
}
