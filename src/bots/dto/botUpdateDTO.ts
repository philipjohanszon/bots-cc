import { IsNotEmpty } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

class Config {
  networkConfig: NetworkConfig;
}

class NetworkConfig {
  networkTimer: number;
  masterUrl: string;
}

export class botUpdateDTO {
  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users id' })
  id: string;

  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users first name' })
  version: string;

  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users last name' })
  ip: string;

  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users email' })
  config: Config;
}
