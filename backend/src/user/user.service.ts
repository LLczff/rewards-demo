import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CoinHistoryFilter } from 'src/common/interfaces/transaction.interface';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { CoinTransaction } from 'src/common/interfaces/transaction.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private transactionService: TransactionService,
  ) {}

  async randomOne(): Promise<User> {
    const user = (await this.userModel
      .aggregate([{ $sample: { size: 1 } }])
      .exec()) as User[];
    return user[0];
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findCoinHistory(
    id: string,
    filter: CoinHistoryFilter,
  ): Promise<CoinTransaction[]> {
    return this.transactionService.findByUser(id, filter);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }
}
