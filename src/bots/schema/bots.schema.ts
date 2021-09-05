import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BotDocument = Bot & Document;

@Schema({ timestamps: true })
export class Bot {
  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true })
  ip: string;

  @Prop({
    type: Object,
    required: true,
  })
  config: {
    networkConfig: {
      networkTimer: number;
      masterUrl: string;
    };
  };
}

export const BotSchema = SchemaFactory.createForClass(Bot);
