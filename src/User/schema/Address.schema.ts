import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Address {
    @Prop({required:true ,default:'Province'})
    province:string

    @Prop({default:'District'})
    district:string

    @Prop({default:'Village'})
    village:string
}

export const AddressSchema = SchemaFactory.createForClass(Address);