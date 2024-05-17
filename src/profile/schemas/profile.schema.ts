import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Profile extends Document {

  @Prop()
  userId: string;

  @Prop({ default: 'First Name' })
  firstName: string;

  @Prop({ default: 'Last Name' })
  lastName: string;

  @Prop({ default: 0 })
  age: string;

  @Prop({ default: 'address' })
  address: string;

  @Prop({})
  avatar?: string;

  @Prop({ default: 'email you' })
  email: string;

  @Prop({ default: 'image' })
  images: string[];

  @Prop({default:Date.now})
  createdAt:Date

  @Prop({default:Date.now})
  updatedAt:Date
}
export const ProfileSchema = SchemaFactory.createForClass(Profile);

// export const ProfileModel = mongoose.model(Profile.name,ProfileSchema)