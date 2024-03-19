import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Address } from "./Address.schema";


@Schema()
export class User {

    // @Prop({ default: () => new Types.ObjectId() })
    // id: string;
    @Prop({default: new mongoose.Types.ObjectId})
    _id:string

    @Prop({required:true,default:'Mr Or Ms'})
    username: string;

    @Prop({default:'lastName'})
    lastName: string;

    @Prop({unique:true,default:'demo@gmail.com'})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Address'}]})
    address: Address[];


}

export const UserSchema = SchemaFactory.createForClass(User)

