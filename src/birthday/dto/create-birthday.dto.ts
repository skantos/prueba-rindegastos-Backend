import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBirthdayDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @IsDateString()
  birthdate: string;
}


