import { IsDateString } from 'class-validator';

export class GetDaysDto {
  @IsDateString()
  birthdate: string;
}


