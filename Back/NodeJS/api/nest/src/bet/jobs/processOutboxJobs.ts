import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessOutboxCommand } from "../../../../../modules/bets/src/infrastructure/Outbox/ProcessOutboxCommand";
import { IBetModule } from '../../../../../Modules/bets/src/application/Abstractions/IBetModule';

@Injectable()
export class BetsProcessOutboxJobs {
    constructor(@Inject('IBetModule') private betModule: IBetModule){
    }
    @Cron('*/10 * * * * *')
    async handleCron() {
        await this.betModule.Execute(new ProcessOutboxCommand());
    }
}