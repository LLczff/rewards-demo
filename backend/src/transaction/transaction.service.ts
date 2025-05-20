import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { CoinHistoryFilter } from 'src/common/interfaces/transaction.interface';
import { CoinTransaction } from 'src/common/interfaces/transaction.interface';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { DealService } from 'src/deal/deal.service';
import { Deal } from 'src/deal/schemas/deal.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private dealService: DealService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<void> {
    try {
      const userId = createTransactionDto.userId;
      // Find user balance
      const user: User | null = await this.userModel.findById(userId).exec();
      if (!user) throw new NotFoundException('User not found');

      const deal: Deal | null = await this.dealService.findOne(
        createTransactionDto.dealId,
      );
      if (!deal) throw new NotFoundException('Deal not found');

      if (user.pawCoin < deal.cost)
        throw new BadRequestException('User coin not met the amount');

      // Deduct user balance
      await this.userModel.findByIdAndUpdate(userId, {
        $set: { pawCoin: user.pawCoin - deal.cost },
      });

      // Insert coin transaction
      const transaction = new this.transactionModel({
        ...createTransactionDto,
        amount: -1 * deal.cost,
        description: deal.title,
      });
      await transaction.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findByUser(
    userId: string,
    filter: CoinHistoryFilter,
  ): Promise<CoinTransaction[]> {
    const query: {
      userId: string;
      amount: { $gte?: number; $lt?: number };
    } = { userId: userId, amount: {} };

    switch (filter) {
      case CoinHistoryFilter.Received:
        query.amount = { $gte: 0 };
        break;
      case CoinHistoryFilter.Spent:
        query.amount = { $lt: 0 };
        break;
      default:
        throw new BadRequestException('Filter is required');
    }

    return this.transactionModel
      .find(query)
      .select({ _id: 1, description: 1, amount: 1, createdAt: 1 })
      .exec();
  }
}
