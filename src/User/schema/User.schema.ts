import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';


@Schema()
export class User {

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true })
  // profileId: Types.ObjectId;

  @Prop({ required: true, default: 'Mr Or Ms' })
  username: string;


  @Prop({ unique: true, default: 'demo@gmail.com' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  is_active_status: boolean;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
  // address: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
