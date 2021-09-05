import { Controller, Post, Body } from '@nestjs/common';
import { botUpdateDTO } from './dto/botUpdateDTO';

@Controller('bots')
export class BotsController {
  @Post('/update')
  async update(@Body() body: botUpdateDTO) {
    console.log(body);
  }
}
