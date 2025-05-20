import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Deal',
  })
  dealId: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
