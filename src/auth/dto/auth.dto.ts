import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  password?: string;
}
