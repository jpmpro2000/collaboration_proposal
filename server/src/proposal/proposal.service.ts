import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
import * as SendGrid from '@sendgrid/mail';

import { CalcWSEVDto } from './dto/calcWSEV.dto';
import { CalcTwelfthsDto } from './dto/calcTwelfths.dto';
import { CalcHealthInsDto } from './dto/calcHealthIns.dto';
import { CalcDVCDto } from './dto/calcDVC.dto';
import { ProposalDto } from './dto/proposal.dto';

import { generatePDF } from './functions/generatePDF';

@Injectable()
export class ProposalService {
  // constructor(private readonly mailerService: MailerService) {}

  calcWSEV(values: CalcWSEVDto) {
    const { baseValue, workSchedExePct } = values;

    //TODO --> CALC WORK SCHEDULE EXEMPTION VALUE
    //--- WORK SCHEDULE EXEMPTION VALUE  //* (valor = BASE VALUE * WORK SCHEDULE EXEMPTION %)

    const workShecExeValue = baseValue * (workSchedExePct / 100);

    console.log('WSEV: ', workShecExeValue.toFixed(2));
    return workShecExeValue.toFixed(2);
  }

  calcTwelfths(values: CalcTwelfthsDto) {
    const { baseValue, workSchedExeValue } = values;

    //TODO --> CALC TWELFTHS
    //--- TWELFTH //* (valor = (BASE VALUE + WORK SCHEDULE EXEMPTION VALUE) / 12)

    const twelfth = (baseValue + workSchedExeValue) / 12;

    console.log('TWELFTH: ', twelfth.toFixed(2));
    return twelfth.toFixed(2);
  }

  calcHealthIns(values: CalcHealthInsDto) {
    const { healthIns, healthInsNumFamMembers } = values;

    //TODO --> CALC TWELFTHS
    //--- HEALTH INSURANCE //* (valor = (HEALTH INSURANCE + HEALTH INSURANCE * NUMBER OF FAMILY MEMBERS)

    const calculatedhealthIns = healthIns + healthIns * healthInsNumFamMembers;

    console.log('HEALTHINS: ', calculatedhealthIns.toFixed(2));
    return calculatedhealthIns.toFixed(2);
  }

  calcDVC(values: CalcDVCDto) {
    const {
      baseValue,
      christmasTwelfth,
      irsTax,
      otherExpenses,
      remoteWorkAlw,
      vacationsTwelfth,
      workSchedExeValue,
    } = values.financial;
    const { commsPlafond, healthIns } = values.benefits;

    //TODO --> CALC DEDUCTIONS
    //--- BASE VALUE SOCIAL SECURITY //* (valor = (BASE VALUE + WORK SCHEDULE EXEMPTION VALUE) * 11%)
    //--- CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY //* (valor = CHRISTMAS TWELFTH * 11%)
    //--- VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY //* (valor = VACATIONS TWELFTH * 11%)
    //--- BASE VALUE IRS //* (valor = (BASE VALUE + WORK SCHEDULE EXEMPTION VALUE) * IRS TAX %)
    //--- CHRISTMAS ALLOWANCE TWELFTH IRS //* (valor = CHRISTMAS TWELFTH * IRS TAX %)
    //--- VACATIONS ALLOWANCE TWELFTH IRS //* (valor = VACATIONS TWELFTH * IRS TAX %)

    const baseValueSS = (baseValue + workSchedExeValue) * 0.11;
    const christmasAlwTwelfthSS = christmasTwelfth * 0.11;
    const vacationsAlwTwelfthSS = vacationsTwelfth * 0.11;
    const baseValueIRS = (baseValue + workSchedExeValue) * (irsTax / 100);
    const christmasAlwTwelfthIRS = vacationsTwelfth * (irsTax / 100);
    const vacationsAlwTwelfthIRS = vacationsTwelfth * (irsTax / 100);

    //TODO --> CALC VALUES
    //--- MONTHLY GROSS VALUE //* (valor = BASE VALUE + WORK SCHEDULE EXEMPTION VALUE +
    //* + VACATIONS TWELFTH + CHRISTMAS TWELFTH + OTHER EXPENSES + REMOTE WORK ALLOWANCE)
    //--- MONTHLY NET VALUE //* (valor = MONTHLY GROSS VALUE - (BASE VALUE SOCIAL SECURITY +
    //* + CHRISTMAS ALLOWANCE TWELFTH SOCIAL SECURITY + VACATIONS ALLOWANCE TWELFTH SOCIAL SECURITY +
    //* + BASE VALUE IRS + CHRISTMAS ALLOWANCE TWELFTH IRS + VACATIONS ALLOWANCE TWELFTH IRS))
    //--- ANNUAL GROSS VALUE //* (valor = MONTHLY GROSS VALUE * 12)
    //--- ANNUAL NET VALUE //* (valor = MONTHLY NET VALUE * 12)
    //--- MONTHLY BENEFITS //* (valor = COMMUNICATIONS PLAFOND + HEALTH INSURANCE)
    //--- ANNUAL BENEFITS //* (valor = MONTHLY BENEFITS * 12)

    const monthlyGrossValue =
      baseValue +
      workSchedExeValue +
      vacationsTwelfth +
      christmasTwelfth +
      otherExpenses +
      remoteWorkAlw;
    const monthlyNetValue =
      monthlyGrossValue -
      (baseValueSS +
        christmasAlwTwelfthSS +
        vacationsAlwTwelfthSS +
        baseValueIRS +
        christmasAlwTwelfthIRS +
        vacationsAlwTwelfthIRS);
    const annualGrossValue = monthlyGrossValue * 12;
    const annualNetValue = monthlyNetValue * 12;
    const monthlyBenefits = commsPlafond + healthIns;
    const annualBenefits = monthlyBenefits * 12;

    //TODO --> COSTS
    //--- ANNUAL COST //* (= ANNUAL GROSS VALUE + ANNUAL BENEFITS)
    //--- MONTHLY COST //* (= ANNUAL COST / 12)
    //--- DAILY COST //* (= MONTHLY COST / 18)

    const annualCost = annualGrossValue + annualBenefits;
    const monthlyCost = annualCost / 12;
    const dailyCost = monthlyCost / 18;

    const calculatedValues = {
      deductions: {
        baseValueSS: baseValueSS.toFixed(2),
        christmasAlwTwelfthSS: christmasAlwTwelfthSS.toFixed(2),
        vacationsAlwTwelfthSS: vacationsAlwTwelfthSS.toFixed(2),
        baseValueIRS: baseValueIRS.toFixed(2),
        christmasAlwTwelfthIRS: christmasAlwTwelfthIRS.toFixed(2),
        vacationsAlwTwelfthIRS: vacationsAlwTwelfthIRS.toFixed(2),
      },
      values: {
        monthlyGrossValue: monthlyGrossValue.toFixed(2),
        monthlyNetValue: monthlyNetValue.toFixed(2),
        annualGrossValue: annualGrossValue.toFixed(2),
        annualNetValue: annualNetValue.toFixed(2),
        monthlyBenefits: monthlyBenefits.toFixed(2),
        annualBenefits: annualBenefits.toFixed(2),
      },
      costs: {
        annualCost: annualCost.toFixed(2),
        monthlyCost: monthlyCost.toFixed(2),
        dailyCost: dailyCost.toFixed(2),
      },
    };

    console.log('DVC: ', calculatedValues);
    return calculatedValues;
  }

  async sendMail(proposal: ProposalDto) {
    const pdf = await generatePDF(proposal);

    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGrid.send({
      to: proposal.general.email,
      from: process.env.SENDGRID_MAIL_SENDER,
      dynamicTemplateData: {
        subject: 'Collaboration Proposal',
        name: proposal.general.name,
      },
      attachments: [
        {
          content: pdf.toString('base64'),
          filename: 'collaboration-proposal.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
          contentId: 'proposal',
        },
      ],
      templateId: process.env.SENDGRID_TEMPLATEID,
    })
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// async sendMail(proposal: Proposal) {
//   return await this.mailerService.sendMail({
//     from: process.env.SENDGRID_MAIL_SENDER,
//     to: proposal.general.email,
//     subject: 'Collaboration Proposal',
//     template: 'email',
//     attachments: [
//       {
//         filename: 'Proposal.pdf',path
//         content: await generatePDF(proposal),
//         contentType: 'application/pdf',
//         contentDisposition: 'attachment',
//       },
//     ],
//     context: {
//       name: proposal.general.name,
//     },
//   });
// }

// async generatePDF(proposal: Proposal) {
//   return await generatePDF(proposal);
// }
