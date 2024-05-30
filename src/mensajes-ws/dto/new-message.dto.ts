import { IsString, MinLength } from 'class-validator';

//Los datos del mensaje que queremos manipular
export class NewMessageDto {
  @IsString()
  @MinLength(1)
  message: string;

  fullName: string;
}
