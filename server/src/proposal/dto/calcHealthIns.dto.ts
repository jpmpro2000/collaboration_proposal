import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalcHealthInsDto {
  @IsNotEmpty()
  @IsNumber()
  healthIns: number;

  @IsNotEmpty()
  @IsNumber()
  healthInsNumFamMembers: number;
}
