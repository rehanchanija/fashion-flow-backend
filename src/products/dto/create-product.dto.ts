import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  size?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map(c => c.trim()).filter(c => c.length > 0);
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  color?: string[];

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isAvailable?: boolean;
}