import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class General {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  collabStartDate: string;
}

class Financial {
  @IsNotEmpty()
  @IsNumber()
  baseValue: number;

  @IsNotEmpty()
  @IsNumber()
  workSchedExePct: number;

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

  @IsNotEmpty()
  @IsNumber()
  healthInsNumFamMembers: number;
}

class Deductions {
  @IsNotEmpty()
  @IsString()
  baseValueSS: string;

  @IsNotEmpty()
  @IsString()
  christmasAlwTwelfthSS: string;

  @IsNotEmpty()
  @IsString()
  vacationsAlwTwelfthSS: string;

  @IsNotEmpty()
  @IsString()
  baseValueIRS: string;

  @IsNotEmpty()
  @IsString()
  christmasAlwTwelfthIRS: string;

  @IsNotEmpty()
  @IsString()
  vacationsAlwTwelfthIRS: string;
}

class Values {
  @IsNotEmpty()
  @IsString()
  monthlyGrossValue: string;

  @IsNotEmpty()
  @IsString()
  monthlyNetValue: string;

  @IsNotEmpty()
  @IsString()
  annualGrossValue: string;

  @IsNotEmpty()
  @IsString()
  annualNetValue: string;

  @IsNotEmpty()
  @IsString()
  monthlyBenefits: string;

  @IsNotEmpty()
  @IsString()
  annualBenefits: string;
}

class Costs {
  @IsNotEmpty()
  @IsString()
  annualCost: string;

  @IsNotEmpty()
  @IsString()
  monthlyCost: string;

  @IsNotEmpty()
  @IsString()
  dailyCost: string;
}

export class ProposalDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => General)
  general: General;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Financial)
  financial: Financial;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Benefits)
  benefits: Benefits;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Deductions)
  deductions: Deductions;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Values)
  values: Values;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Costs)
  costs: Costs;
}
