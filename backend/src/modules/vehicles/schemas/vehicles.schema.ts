import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vehicle extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  vehicleModel: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, unique: true })
  licensePlate: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, unique: true })
  renavam: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
VehicleSchema.index({ renavam: 1 }, { unique: true });
VehicleSchema.index({ licensePlate: 1 }, { unique: true });
