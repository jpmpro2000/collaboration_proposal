import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class Financial {
  @IsNotEmpty()
  @IsNumber()
  baseValue: number;

  @IsNotEmpty()
  @IsNumber()
  workSchedExeValue: number;

  @IsNotEmpty()
  @IsNumber()
  christmasTwelfth: number;

  @IsNotEmpty()
  @IsNumber()
  vacationsTwelfth: number;

  @IsNotEmpty()
  @IsNumber()
  irsTax: number;

  @IsNotEmpty()
  @IsNumber()
  otherExpenses: number;

  @IsNotEmpty()
  @IsNumber()
  remoteWorkAlw: number;
}

class Benefits {
  @IsNotEmpty()
  @IsNumber()
  commsPlafond: number;

  @IsNotEmpty()
  @IsNumber()
  healthIns: number;
}

export class CalcDVCDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Financial)
  financial: Financial;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Benefits)
  benefits: Benefits;
}
