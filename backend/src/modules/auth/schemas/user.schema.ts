import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop()
  resetToken?: string;

  @Prop()
  resetTokenExpires?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);

UsersSchema.pre<UserDocument>('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
