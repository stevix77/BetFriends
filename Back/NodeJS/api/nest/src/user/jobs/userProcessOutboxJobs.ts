import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessOutboxCommand, ProcessOutboxCommandHandler } from "../../../../../modules/users/src/infrastructure/Outbox/ProcessOutboxCommand";

@Injectable()
export class UserProcessOutboxJobs {
    constructor(@Inject('UserProcessOutboxCommandHandler') private readonly processOutboxCommandHandler: ProcessOutboxCommandHandler){}

    @Cron('*/10 * * * * *')
    async handleCron() {
        await this.processOutboxCommandHandler.Handle(new ProcessOutboxCommand());
    }
}