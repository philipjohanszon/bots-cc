import { IsNotEmpty } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

class VersionUpdate {
  update: boolean;
  url: string;
}

export class botResponseDTO {
  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users id' })
  commands: Array<string>;

  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users first name' })
  configUpdates: Object;

  @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'The users email' })
  versionUpdate: VersionUpdate;
}
