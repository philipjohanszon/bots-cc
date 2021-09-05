import { Controller, Post, Body } from '@nestjs/common';
import { botUpdateDTO } from './dto/botUpdateDTO';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {
  constructor(private botsService: BotsService) {}

  @Post('/update')
  async update(@Body() body: botUpdateDTO) {
    return this.botsService.handleUpdate(body);
  }
}
