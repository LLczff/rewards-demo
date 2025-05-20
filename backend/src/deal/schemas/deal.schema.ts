import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DealDocument = Deal & Document;

@Schema({ timestamps: true })
export class Deal {
  @Prop({
    type: Types.ObjectId,
    ref: 'Place',
    required: true,
  })
  placeId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ type: Number, required: true })
  totalQuota: number;

  @Prop({
    required: true,
    default: function () {
      const _t = this as Deal; // prevent tslint warning
      return _t.totalQuota;
    },
  })
  remainingQuota: number;

  @Prop({ required: true })
  availableDate: Date;

  @Prop({ required: true })
  expiryDate: Date;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
