import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ComputeNumberDto {
  @Type(() => Number)
  @IsInt()
  first: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  second: number;
}


