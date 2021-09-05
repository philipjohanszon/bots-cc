import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bot, BotSchema } from './schema/bots.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }])],
  providers: [BotsService],
  controllers: [BotsController],
})
export class BotsModule {}
