import { IsMongoId, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  @IsOptional()
  readonly dealId: string;
}
