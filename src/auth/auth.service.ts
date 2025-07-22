import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { CreateAdminDto, LoginAdminDto } from './dto/auth.dto';
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
    });
    return createdAdmin.save();
  }

  async validateAdmin(loginAdminDto: LoginAdminDto): Promise<{ access_token: string }> {
    const admin = await this.adminModel.findOne({ email: loginAdminDto.email });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: admin.email, sub: admin._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
