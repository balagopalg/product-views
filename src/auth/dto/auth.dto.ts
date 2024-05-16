import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SigninInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  password: string;
}
