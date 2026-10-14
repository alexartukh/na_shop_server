import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price!: number;
}