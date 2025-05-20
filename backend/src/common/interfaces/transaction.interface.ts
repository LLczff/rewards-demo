import { Transaction } from 'src/transaction/schemas/transaction.schema';

export enum CoinHistoryFilter {
  Received = 'received',
  Spent = 'spent',
}

export type CoinTransaction = Omit<Transaction, 'userId'>;
