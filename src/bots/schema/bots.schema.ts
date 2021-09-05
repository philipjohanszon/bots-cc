import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BotDocument = Bot & Document;

@Schema({ timestamps: true })
export class Bot {
  @Prop({ type: String, required: true })
  version: string;

  @Prop({ type: String, required: true })
  versionUrl: string;

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

  @Prop({ type: Array, required: true })
  commands: Array<string>;

  @Prop({ type: Date, default: Date.now() + 1000 * 60 * 5, required: true })
  expiresAt: Date;
}

export const BotSchema = SchemaFactory.createForClass(Bot).index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);
