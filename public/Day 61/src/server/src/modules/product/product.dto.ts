import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  name!: string;

  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  description!: string;

  @IsNotEmpty({ message: "Price is required" })
  @IsNumber({}, { message: "Price must be a number" })
  @Min(0, { message: "Price cannot be negative" })
  price!: number;

  @IsOptional()
  @IsNumber({}, { message: "Discount must be a number" })
  @Min(0, { message: "Discount cannot be negative" })
  discount?: number;

  @IsNotEmpty({ message: "Images are required" })
  @IsArray({ message: "Images must be an array" })
  @IsString({ each: true, message: "Each image must be a string" })
  images!: string[];

  @IsNotEmpty({ message: "Stock is required" })
  @IsNumber({}, { message: "Stock must be a number" })
  @Min(0, { message: "Stock cannot be negative" })
  stock!: number;

  @IsNotEmpty({ message: "Category ID is required" })
  @IsString({ message: "Category ID must be a string" })
  categoryId!: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: "Price must be a number" })
  @Min(0, { message: "Price cannot be negative" })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: "Discount must be a number" })
  @Min(0, { message: "Discount cannot be negative" })
  discount?: number;

  @IsOptional()
  @IsArray({ message: "Images must be an array" })
  @IsString({ each: true, message: "Each image must be a string" })
  images?: string[];

  @IsOptional()
  @IsNumber({}, { message: "Stock must be a number" })
  @Min(0, { message: "Stock cannot be negative" })
  stock?: number;

  @IsOptional()
  @IsString({ message: "Category ID must be a string" })
  categoryId?: string;
}
