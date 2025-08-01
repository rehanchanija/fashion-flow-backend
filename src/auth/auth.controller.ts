import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto, CreateUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAdminDto) {
    return this.authService.validateLogin(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
