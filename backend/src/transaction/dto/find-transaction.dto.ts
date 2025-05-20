import { IsEnum, IsNotEmpty } from 'class-validator';
import { CoinHistoryFilter } from 'src/common/interfaces/transaction.interface';

export class GetTransactionDto {
  @IsNotEmpty()
  @IsEnum(CoinHistoryFilter)
  filter: CoinHistoryFilter;
}
