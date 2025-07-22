import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  size: string[];

  @Prop()
  color: string[];

  @Prop({ default: true })
  isAvailable: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
