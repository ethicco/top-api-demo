import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MSchema } from 'mongoose';
import { ProductModel } from '../product/product.model';

@Schema({ timestamps: { createdAt: true } })
export class ReviewModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name })
  productId: MSchema.Types.ObjectId;
}

export type ReviewDocument = HydratedDocument<ReviewModel>;

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
