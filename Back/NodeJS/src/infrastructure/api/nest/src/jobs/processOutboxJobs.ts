import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessOutboxCommand, ProcessOutboxCommandHandler } from "../../../../Outbox/ProcessOutboxCommand";

@Injectable()
export class ProcessOutboxJobs {
    constructor(@Inject(ProcessOutboxCommandHandler) private processOutboxCommandHandler: ProcessOutboxCommandHandler){
    }
    @Cron('*/10 * * * * *')
    async handleCron() {
        await this.processOutboxCommandHandler.Handle(new ProcessOutboxCommand());
    }
}