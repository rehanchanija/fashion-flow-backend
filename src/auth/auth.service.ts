import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto, LoginAdminDto, CreateUserDto } from './dto/auth.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const createdAdmin = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
      role: 'admin'
    });
    return createdAdmin.save();
  }

 

  async validateLogin(loginDto: LoginAdminDto): Promise<{ access_token: string; role: string }> {
    // Try to find user in both admin and user collections
    const admin = await this.adminModel.findOne({ email: loginDto.email });

    const account = admin ;
    if (!account) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, account.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

  
    const payload = { email: account.email, sub: account._id, role: account.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: account.role
    };

  }}
