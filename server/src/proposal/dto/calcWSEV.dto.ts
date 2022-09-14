import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalcWSEVDto {
  @IsNotEmpty()
  @IsNumber()
  baseValue: number;

  @IsNotEmpty()
  @IsNumber()
  workSchedExePct: number;
}
