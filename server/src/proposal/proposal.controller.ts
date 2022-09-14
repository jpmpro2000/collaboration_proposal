import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { ProposalService } from './proposal.service';

import { CalcWSEVDto } from './dto/calcWSEV.dto';
import { CalcTwelfthsDto } from './dto/calcTwelfths.dto';
import { CalcHealthInsDto } from './dto/calcHealthIns.dto';
import { CalcDVCDto } from './dto/calcDVC.dto';
import { ProposalDto } from './dto/proposal.dto';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post('calcWSEV')
  calcWSEV(@Body() values: CalcWSEVDto) {
    return this.proposalService.calcWSEV(values);
  }

  @Post('calcTwelfths')
  calcTwelfths(@Body() values: CalcTwelfthsDto) {
    return this.proposalService.calcTwelfths(values);
  }

  @Post('calcHealthIns')
  calcHealthIns(@Body() values: CalcHealthInsDto) {
    return this.proposalService.calcHealthIns(values);
  }

  @Post('calcDVC')
  calcDVC(@Body() values: CalcDVCDto) {
    return this.proposalService.calcDVC(values);
  }

  @Post('sendMail')
  async sendEmail(@Body() proposal: ProposalDto) {
    return await this.proposalService.sendMail(proposal);
  }

  // @Post('generatePDF')
  // async generatePDF(@Body() proposal: Proposal, @Res() res: Response) {
  //   const buffer = await this.proposalService.generatePDF(proposal);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'attachment; filename=proposal.pdf',
  //     'Content-Length': buffer.length,
  //   });

  //   return res.end(buffer);
  // }
}
