import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  size?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  color?: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  size?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  color?: string[];

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class QueryProductDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
