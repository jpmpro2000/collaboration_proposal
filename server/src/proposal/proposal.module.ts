import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { join } from 'path';

import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';

@Module({
  // imports: [
  //   MailerModule.forRootAsync({
  //     useFactory: async () => ({
  //       transport: {
  //         host: process.env.SENDGRID_HOST,
  //         secure: true,
  //         port: 465,
  //         tls: { rejectUnauthorized: true },
  //         auth: {
  //           user: process.env.SENDGRID_USER,
  //           pass: process.env.SENDGRID_PASSWORD,
  //         },
  //       },
  //       defaults: {
  //         from: '<sendgrid_from_email_address>',
  //       },
  //       template: {
  //         dir: join(__dirname, './templates'),
  //         adapter: new HandlebarsAdapter(),
  //         options: {
  //           strict: true,
  //         },
  //       },
  //     }),
  //   }),
  // ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
