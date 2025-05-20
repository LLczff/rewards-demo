import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place {
  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ ype: Number, required: true })
  lat: number;

  @Prop({ type: Number, required: true })
  lon: number;

  @Prop({ required: true })
  location: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
