import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessOutboxCommand, ProcessOutboxCommandHandler } from "../../../../../modules/bets/src/infrastructure/Outbox/ProcessOutboxCommand";

@Injectable()
export class BetsProcessOutboxJobs {
    constructor(@Inject('BetsProcessOutboxCommandHandler') private processOutboxCommandHandler: ProcessOutboxCommandHandler){
    }
    @Cron('*/10 * * * * *')
    async handleCron() {
        await this.processOutboxCommandHandler.Handle(new ProcessOutboxCommand());
    }
}