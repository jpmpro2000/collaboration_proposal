import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProposalModule } from './proposal/proposal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProposalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
