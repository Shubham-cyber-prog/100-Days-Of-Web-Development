import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class AddToCartDto {
  @IsNotEmpty({ message: "Product ID is required" })
  @IsString({ message: "Product ID must be a string" })
  productId!: string;

  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({}, { message: "Quantity must be a number" })
  @Min(1, { message: "Quantity must be at least 1" })
  quantity!: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty({ message: "Product ID is required" })
  @IsString({ message: "Product ID must be a string" })
  productId!: string;

  @IsNotEmpty({ message: "Quantity is required" })
  @IsNumber({}, { message: "Quantity must be a number" })
  @Min(0, { message: "Quantity cannot be negative" })
  quantity!: number;
}

export class RemoveFromCartDto {
  @IsNotEmpty({ message: "Product ID is required" })
  @IsString({ message: "Product ID must be a string" })
  productId!: string;
}
