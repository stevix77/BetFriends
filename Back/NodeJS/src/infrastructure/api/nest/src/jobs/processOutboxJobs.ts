import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IBetModule } from '../../../../../application/Abstractions/IBetModule';
import { ProcessOutboxCommand } from "../../../../Outbox/ProcessOutboxCommand";

@Injectable()
export class ProcessOutboxJobs {
    constructor(@Inject('IBetModule') private module: IBetModule){
    }
    // @Cron('*/10 * * * * *')
    async handleCron() {
        await this.module.ExecuteCommand(new ProcessOutboxCommand());
    }
}