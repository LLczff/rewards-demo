import {
  IsArray,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DealSort } from 'src/common/enums/deal.enum';

enum Category {
  PetAccommodation = 'Pet Accommodation',
  PetFriendlyHotel = 'Pet-friendly Hotel',
  PetFriendlyRestaurant = 'Pet-friendly Cafe-Restaurant',
  PetCafe = 'Pet Cafe',
  ShoppingMall = 'Shopping Mall',
  PetShop = 'Pet Shop',
  Grooming = 'Grooming',
  TrainingCenter = 'Training Center',
  PetSwimmingPool = 'Pet Swimming Pool',
  PetPlayground = 'PetPlayground',
  VeterinaryHospital = 'Veterinary Hospital',
}

export class FindDealDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: string }) => {
    // Handle both single value and array
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  category?: string[];

  @IsOptional()
  sort?: DealSort;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(1)
  @Max(20)
  limit?: number;

  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    return Number(value);
  })
  @IsNumber()
  @Min(0)
  offset?: number;
}
