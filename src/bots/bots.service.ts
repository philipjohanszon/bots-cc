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
      return this.createNewBot(data);
    } else {
      const bot: Bot = await this.botModel.findOne({ _id: data.id }).exec();

      //if there is no bot
      if (!bot) {
        return this.createNewBot(data);
      }

      //if bot exists
      return this.updateBot(bot, data);
    }
  }

  async createNewBot(data: botUpdateDTO): Promise<botResponseDTO> {
    let expiresAt: number;

    //just incase it doesnt send a networkTimer in config
    if (
      'networkConfig' in data.config &&
      'networkTimer' in data.config.networkConfig
    ) {
      expiresAt =
        Date.now() + Number(data.config.networkConfig.networkTimer / 1000000);
    } else {
      //5 min standard
      expiresAt = Date.now() + 1000 * 60 * 5;
    }
    const newBot = new this.botModel({
      version: data.version,
      ip: data.ip,
      versionUrl: 'hhh',
      expiresAt: expiresAt,
      config: data.config,
      commands: [],
    });

    await newBot.save();

    let response: botResponseDTO = new botResponseDTO();

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
  }

  async updateBot(bot: Bot, data: botUpdateDTO): Promise<botResponseDTO> {
    let response: botResponseDTO = new botResponseDTO();

    if (data.version !== bot.version) {
      response.versionUpdate = {
        update: true,
        url: bot.versionUrl,
      };

      response.commands = [];
      response.configUpdates = [];

      return response;
    }

    response.versionUpdate = {
      update: false,
      url: '',
    };

    response.commands = bot.commands;
    response.configUpdates = bot.config;

    console.log(response);

    return response;
  }
}
