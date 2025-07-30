import { Body, Controller, Post, Get, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto, LoginAdminDto, CreateUserDto, UpdateUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async adminSignup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAdminDto) {
    return this.authService.validateLogin(loginDto);
  }


  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  async adminCreateUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    // Check if the requester is an admin
    if (req.user.role !== 'Admin') {
      throw new UnauthorizedException('Only admins can create users');
    }
    return this.authService.createUser(createUserDto);
  }



  @UseGuards(JwtAuthGuard)
  @Put('user/profile')
  async updateUserProfile(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return this.authService.updateUserProfile(req.user.email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  async getAllUsers(@Req() req) {
    if (req.user.role !== 'Admin') {
      throw new UnauthorizedException('Only admins can view all users');
    }
    return this.authService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Post('delete-user')
  async deleteUser(@Body('email') email: string, @Req() req) {
    // Check if the requester is an admin
    if (req.user.role !== 'Admin') {
      throw new UnauthorizedException('Only admins can delete users');
    }
    return this.authService.deleteUser(email);
  }
}
