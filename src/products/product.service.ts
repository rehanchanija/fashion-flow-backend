import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto/product.dto';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const result = await this.cloudinaryService.uploadImage(file);
    const newProduct = new this.productModel({
      ...createProductDto,
      imageUrl: result.secure_url,
    });
    return newProduct.save();
  }

  async findAll(query: QueryProductDto) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const searchQuery: any = {};
    if (query.search) {
      searchQuery.$or = [
        { name: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    }
    if (query.category) {
      searchQuery.category = query.category;
    }

    const [products, total] = await Promise.all([
      this.productModel
        .find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.productModel.countDocuments(searchQuery),
    ]);

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}
