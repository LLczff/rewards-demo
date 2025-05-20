import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ min: 0, default: 0 })
  pawCoin: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
