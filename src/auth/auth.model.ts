import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: { createdAt: true } })
export class AuthModel {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;
}

export type AuthDocument = HydratedDocument<AuthModel>;

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
