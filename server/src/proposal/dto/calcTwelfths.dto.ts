import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalcTwelfthsDto {
  @IsNotEmpty()
  @IsNumber()
  baseValue: number;

  @IsNotEmpty()
  @IsNumber()
  workSchedExeValue: number;
}
