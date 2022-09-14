import * as PDFDocument from 'pdfkit';
import * as SVGtoPDF from 'svg-to-pdfkit';

import { ProposalDto } from '../dto/proposal.dto';

export const generatePDF = async (proposal: ProposalDto): Promise<Buffer> => {
  const pdfBuffer: Buffer = await new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      bufferPages: true,
      margins: {
        top: 80,
        bottom: 80,
        left: 30,
        right: 30,
      },
    });

    generateHeader(doc);

    generateGeneralSection(doc, proposal);
    generateFinancialSection(doc, proposal);
    generateBenefitsSection(doc, proposal);
    generateDeductionsSection(doc, proposal);
    generateValuesSection(doc, proposal);
    generateCostsSection(doc, proposal);

    doc.end();

    const buffer = [];
    doc.on('data', buffer.push.bind(buffer));
    doc.on('end', () => {
      const data = Buffer.concat(buffer);
      resolve(data);
    });
  });

  return pdfBuffer;
};

const generateHeader = (doc: PDFKit.PDFDocument) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 1942.15 562.04" style="enable-background:new 0 0 1942.15 562.04;" xml:space="preserve">
      <style type="text/css">
        .st0{fill:#231F20;}
        .st1{fill:#00A2AA;}
      </style>
        <g>
          <path class="st0" d="M481.48,422.69c-15.54,0-25.71-2.4-35.88-5.39c-4.78-1.2-7.77,0-7.77,5.39v99.27   c0,8.36-4.79,13.15-13.16,13.15H387c-8.37,0-13.16-4.78-13.16-13.15V234.32c0-53.22,43.05-99.87,107.64-99.87   c64.59,0,107.64,46.65,107.64,99.87v88.5C589.11,376.04,546.07,422.69,481.48,422.69z M525.13,234.32   c0-20.93-15.55-43.05-43.66-43.05c-28.1,0-43.65,22.12-43.65,43.05v88.5c0,20.92,15.54,43.04,43.65,43.04   c28.1,0,43.66-22.11,43.66-43.04V234.32z"/>
          <path class="st0" d="M852.22,416.7H828.9c-4.78,0-8.37-1.79-10.76-5.38c-2.99-4.19-5.97-3.59-8.37-2.39   c-15.55,8.38-31.1,13.77-52.03,13.77c-64.57,0-107.64-46.65-107.64-99.86c0-53.22,43.06-99.27,107.64-99.27   c13.16,0,27.51,3.59,37.67,7.77c2.99,1.19,5.99-1.2,5.38-4.18c-2.39-14.96-14.95-35.87-43.06-35.87   c-17.34,0-34.67,4.78-53.22,14.34c-6.58,3.59-12.56,1.2-16.74-5.97l-15.55-25.73c-4.18-6.56,0-14.34,6.58-17.93   c25.71-14.35,52.03-21.53,78.93-21.53c64.59,0,107.64,46.65,107.64,99.87v169.21C865.37,411.92,860.59,416.7,852.22,416.7z    M757.73,280.37c-28.1,0-43.65,21.52-43.65,42.45c0,20.92,15.55,43.04,43.65,43.04c28.11,0,43.66-22.11,43.66-43.04   C801.4,301.89,785.84,280.37,757.73,280.37z"/>
          <path class="st0" d="M1128.47,416.7h-37.67c-8.37,0-13.15-4.78-13.15-13.16V234.32c0-20.93-15.54-43.05-43.65-43.05   c-28.1,0-43.65,22.12-43.65,43.05v169.21c0,8.39-4.78,13.16-13.15,13.16h-37.68c-8.37,0-13.16-4.78-13.16-13.16V153.6   c0-8.38,4.78-13.16,13.16-13.16h23.33c4.77,0,8.37,1.79,10.76,5.38c2.98,4.18,5.97,3.59,8.37,2.4   c15.54-8.38,31.07-13.77,52.01-13.77c64.59,0,107.64,46.65,107.64,99.87v169.21C1141.64,411.92,1136.84,416.7,1128.47,416.7z"/>
          <path class="st0" d="M1404.74,416.7h-23.33c-4.78,0-8.37-1.79-10.76-5.38c-2.99-4.19-5.97-3.59-8.37-2.39   c-15.54,8.38-31.09,13.77-52.01,13.77c-64.6,0-107.64-46.65-107.64-99.86v-88.5c0-53.22,43.05-99.87,107.64-99.87   c15.53,0,25.71,2.39,35.88,5.39c4.77,1.2,7.77,0,7.77-5.39V35.19c0-8.37,4.78-13.15,13.14-13.15h37.68   c8.37,0,13.15,4.79,13.15,13.15v368.35C1417.89,411.92,1413.11,416.7,1404.74,416.7z M1353.91,234.32   c0-20.93-15.55-43.05-43.65-43.05c-28.12,0-43.67,22.12-43.67,43.05v88.5c0,20.92,15.55,43.04,43.67,43.04   c28.09,0,43.65-22.11,43.65-43.04V234.32z"/>
          <path class="st1" d="M1557.44,48.64h-2.09c-9.7,0-15.23-4.85-15.23-13.15c0-8.31,5.53-13.16,15.23-13.16h2.09   c9.68,0,15.21,4.85,15.21,13.16C1572.65,43.78,1567.12,48.64,1557.44,48.64z"/>
          <path class="st1" d="M1670.8,417.98c-10.75,5.39-23.91,8.38-37.67,8.38c-63.75,0-93.36-47.93-93.36-97.56V153.6   c0-8.38,8.45-13.16,16.83-13.16h5.47c8.36,0,13.14,4.78,13.14,13.16v175.2c0,34.1,22.72,63.9,61.6,63.9   c9.56,0,18.54-2.39,25.11-5.39c7.17-2.98,11.28-1.78,14.87,4.2C1680.96,398.08,1677.98,414.39,1670.8,417.98z"/>
          <path class="st1" d="M1915.19,409.09c-9.56,8.97-28.69,20.94-56.8,20.94c-69.09,0-97.04-51.6-97.04-101.23V189.48   c0-16.75-9.57-18.98-26.31-18.98h-8.96c-8.37,0-13.16-8.45-13.16-15.02c0-6.59,4.79-15.04,13.16-15.04h8.96   c16.74,0,26.31-9.58,26.31-26.31V74.65c0-8.37,8.45-13.15,16.84-13.15h5.47c8.36,0,13.15,4.78,13.15,13.15v39.47   c0,16.74,9.55,26.31,26.3,26.31h61.6c8.36,0,13.15,8.45,13.15,15.04c0,6.57-4.79,15.02-13.15,15.02h-61.6   c-16.75,0-26.3,2.23-26.3,18.98V328.8c0,34.1,22.71,67.57,61.59,67.57c17.35,0,29.3-6.57,37.67-13.15c7.18-5.98,14.95-7.18,20.33-3   C1923.55,386.21,1921.76,403.11,1915.19,409.09z"/>
          <path class="st0" d="M245.28,283.36c-1.19-2.41-1.19-7.17,0-9.57l65.78-116.6c3.59-6.59,0.59-16.74-8.97-16.74h-41.85   c-8.38,0-15.56,6.57-19.14,13.16l-29.3,55.6c-2.4,4.79-4.19,7.78-6.58,7.78c-2.4,0-4.19-3-6.57-7.78l-29.31-55.6   c-3.05-5.6-8.69-11.14-15.46-12.69l21.99,41.76c0.47,0.94,0.94,1.81,1.39,2.64l39.18,74.41c0,0,3,8.26,3,18.65   c0,10.38-3,18.64-3,18.64l-39.85,75.72c-0.02,0.04-0.04,0.09-0.07,0.13l-22.73,43.19c7.33-1.7,12.64-6.67,15.56-12.51l29.31-55.59   c2.39-4.79,4.18-7.78,6.57-7.78c2.39,0,4.18,3,6.58,7.78l29.3,55.59c3.58,7.19,10.77,13.16,20.94,13.16h40.06   c9.56,0,12.56-10.16,8.97-16.74L245.28,283.36z"/>
          <path class="st1" d="M128.74,435.79l33.12-62.94c0.03-0.04,0.05-0.09,0.07-0.13L201.78,297c0,0,3-8.26,3-18.64   c0-10.39-3-18.65-3-18.65L162.6,185.3c-0.45-0.83-0.92-1.7-1.39-2.64l-23.83-45.28l0,0l-17.58-33.36   c-5.01-9.17-15.02-18.36-26.7-18.36H35.53c-14.18,0-19.19,13.36-13.34,23.37l91.76,162.68c1.67,3.34,1.67,10.01,0,13.36   L22.19,447.75c-5.85,10.01-0.84,23.36,13.34,23.36H90.6c14.18,0,24.19-8.35,29.2-18.35L128.74,435.79L128.74,435.79z"/>
        </g>
    </svg>`;

  SVGtoPDF(doc, svg, 25, 10, {
    width: 150,
    height: 40,
  });

  doc
    .fillColor('#0098a6')
    .font('public/fonts/Poppins-Bold.ttf', 16)
    .text('Collaboration Proposal', { align: 'center' })
    .moveDown();
};

const generateGeneralSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.font('public/fonts/Poppins-Semibold.ttf', 14).text('General', 30, 120);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc.text('Name', 30, 140).text(proposal.general.name, 350, 140);
  doc.text('Email', 30, 155).text(proposal.general.email, 350, 155);
  doc
    .text('Collaboration Start Date', 30, 170)
    .text(proposal.general.collabStartDate, 350, 170);
};

const generateFinancialSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.fillColor('#0098a6').font('public/fonts/Poppins-Semibold.ttf', 14);
  doc.text('Financial', 30, 200);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc
    .text('Base Value', 30, 220)
    .text(`${proposal.financial.baseValue}€`, 350, 220);
  doc
    .text('Work Shedule Exemption %', 30, 235)
    .text(`${proposal.financial.workSchedExePct}%`, 350, 235);
  doc
    .text('Work Shedule Exemption Value', 30, 250)
    .text(`${proposal.financial.workSchedExeValue}`, 350, 250);
  doc
    .text('IRS Tax %', 30, 265)
    .text(`${proposal.financial.irsTax}%`, 350, 265);
  doc
    .text('Vacations Twelfth', 30, 280)
    .text(`${proposal.financial.vacationsTwelfth}€`, 350, 280);
  doc
    .text('Christmas Twelfth', 30, 295)
    .text(`${proposal.financial.christmasTwelfth}€`, 350, 295);
  doc
    .text('Other Expenses', 30, 310)
    .text(`${proposal.financial.otherExpenses}€`, 350, 310);
  doc
    .text('Remote Work Allowance', 30, 325)
    .text(`${proposal.financial.remoteWorkAlw}€`, 350, 325);
};

const generateBenefitsSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.fillColor('#0098a6').font('public/fonts/Poppins-Semibold.ttf', 14);
  doc.text('Benefits', 30, 355);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc
    .text('Communications Plafond', 30, 375)
    .text(`${proposal.benefits.commsPlafond}€`, 350, 375);
  doc
    .text('Health Insurance', 30, 390)
    .text(`${proposal.benefits.healthIns}€`, 350, 390);
  doc
    .text('Number of Familiy Members included in Health Insurance', 30, 405)
    .text(`${proposal.benefits.healthInsNumFamMembers}`, 350, 405);
};

const generateDeductionsSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.fillColor('#0098a6').font('public/fonts/Poppins-Semibold.ttf', 14);
  doc.text('Deductions', 30, 435);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc
    .text('Base Value Social Security', 30, 455)
    .text(`${proposal.deductions.baseValueSS}€`, 350, 455);
  doc
    .text('Christmas Allowance Twelfth Social Security', 30, 470)
    .text(`${proposal.deductions.christmasAlwTwelfthSS}€`, 350, 470);
  doc
    .text('Vacations Allowance Twelfth Social Security', 30, 485)
    .text(`${proposal.deductions.vacationsAlwTwelfthSS}€`, 350, 485);
  doc
    .text('Base Value IRS', 30, 500)
    .text(`${proposal.deductions.baseValueIRS}€`, 350, 500);
  doc
    .text('Christmas Allowance Twelfth IRS', 30, 515)
    .text(`${proposal.deductions.christmasAlwTwelfthIRS}€`, 350, 515);
  doc
    .text('Vacations Allowance Twelfth IRS', 30, 530)
    .text(`${proposal.deductions.vacationsAlwTwelfthIRS}€`, 350, 530);
};

const generateValuesSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.fillColor('#0098a6').font('public/fonts/Poppins-Semibold.ttf', 14);
  doc.text('Values', 30, 560);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc
    .text('Monthly Gross Value', 30, 580)
    .text(`${proposal.values.monthlyGrossValue}€`, 350, 580);
  doc
    .text('Monthly Net Value', 30, 595)
    .text(`${proposal.values.monthlyNetValue}€`, 350, 595);
  doc
    .text('Annual Gross Value', 30, 610)
    .text(`${proposal.values.annualGrossValue}€`, 350, 610);
  doc
    .text('Annual Net Value', 30, 625)
    .text(`${proposal.values.annualNetValue}€`, 350, 625);
  doc
    .text('Monthly Benefits', 30, 640)
    .text(`${proposal.values.monthlyBenefits}€`, 350, 640);
  doc
    .text('Annual Benefits', 30, 655)
    .text(`${proposal.values.annualBenefits}€`, 350, 655);
};

const generateCostsSection = (
  doc: PDFKit.PDFDocument,
  proposal: ProposalDto,
) => {
  doc.fillColor('#0098a6').font('public/fonts/Poppins-Semibold.ttf', 14);
  doc.text('Costs', 30, 685);
  doc.fillColor('#4b5563').font('public/fonts/Poppins-Regular.ttf', 10);

  doc
    .text('Annual Cost', 30, 705)
    .text(`${proposal.costs.annualCost}€`, 350, 705);
  doc
    .text('Monthly Cost', 30, 720)
    .text(`${proposal.costs.monthlyCost}€`, 350, 720);
  doc
    .text('Daily Cost', 30, 735)
    .text(`${proposal.costs.dailyCost}€`, 350, 735);
};
