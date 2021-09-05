import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bot, BotDocument } from './schema/bots.schema';
import { botUpdateDTO } from './dto/botUpdateDTO';
import { botResponseDTO } from './dto/botResponseDTO';

@Injectable()
export class BotsService {
  constructor(@InjectModel(Bot.name) private botModel: Model<BotDocument>) {}

  async findAll(): Promise<Bot[]> {
    return this.botModel.find().exec();
  }

  async handleUpdate(data: botUpdateDTO): Promise<botResponseDTO> {
    if (data.id === 'none') {
      //Creates a new bot
      const newBot = new this.botModel(botUpdateDTO);
      await newBot.save();

      let response = new botResponseDTO();

      response.commands = [];
      response.configUpdates = {
        id: newBot.id,
      };
      response.versionUpdate = {
        update: false,
        url: '',
      };

      console.log(response);

      return response;
    } else {
    }

    return new botResponseDTO();
  }
}
