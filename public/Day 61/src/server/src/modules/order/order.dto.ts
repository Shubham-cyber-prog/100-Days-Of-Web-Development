import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class UpdateTrackingStatusDto {
  @IsNotEmpty({ message: "Status is required" })
  @IsString({ message: "Status must be a string" })
  @IsIn(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"], {
    message: "Status must be one of: PENDING, SHIPPED, DELIVERED, CANCELLED",
  })
  status!: string;
}
