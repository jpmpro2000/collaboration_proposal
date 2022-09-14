export type Proposal = {
  general: {
    name: string;
    email: string;
    collabStartDate: string;
  };
  financial: {
    baseValue: number;
    workSchedExePct: number;
    workSchedExeValue: number;
    irsTax: number;
    vacationsTwelfth: number;
    christmasTwelfth: number;
    otherExpenses: number;
    remoteWorkAlw: number;
  };
  benefits: {
    commsPlafond: number;
    healthIns: number;
    healthInsNumFamMembers: number;
  };
  deductions: {
    baseValueSS: number;
    christmasAlwTwelfthSS: number;
    vacationsAlwTwelfthSS: number;
    baseValueIRS: number;
    christmasAlwTwelfthIRS: number;
    vacationsAlwTwelfthIRS: number;
  };
  values: {
    monthlyGrossValue: number;
    monthlyNetValue: number;
    annualGrossValue: number;
    annualNetValue: number;
    monthlyBenefits: number;
    annualBenefits: number;
  };
  costs: {
    annualCost: number;
    monthlyCost: number;
    dailyCost: number;
  };
};

export type ProposalInputs = {
  general: {
    name: string;
    email: string;
    collabStartDate: string;
  };
  financial: {
    baseValue: number;
    workSchedExePct: number;
    workSchedExeValue: number;
    irsTax: number;
    vacationsTwelfth: number;
    christmasTwelfth: number;
    otherExpenses: number;
    remoteWorkAlw: number;
  };
  benefits: {
    commsPlafond: number;
    healthIns: number;
    healthInsNumFamMembers: number;
  };
};

export type CalcDVC = {
  financial: {
    baseValue: number;
    workSchedExeValue: number;
    irsTax: number;
    vacationsTwelfth: number;
    christmasTwelfth: number;
    otherExpenses: number;
    remoteWorkAlw: number;
  };
  benefits: {
    commsPlafond: number;
    healthIns: number;
  };
};
