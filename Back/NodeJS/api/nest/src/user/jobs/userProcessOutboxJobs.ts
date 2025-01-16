import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IUserModule } from '../../../../../modules/users/src/application/abstractions/IUserModule';
import { ProcessOutboxCommand } from '../../../../../modules/users/src/infrastructure/outbox/ProcessOutboxCommand';

@Injectable()
export class UserProcessOutboxJobs {
    constructor(@Inject('IUserModule') private readonly userModule: IUserModule){}

    @Cron('*/10 * * * * *')
    async handleCron() {
        await this.userModule.Execute(new ProcessOutboxCommand());
    }
}