import { Controller, Get, HttpStatus, Inject, Res } from "@nestjs/common";
import { IBetModule } from "../../../../../../../application/Abstractions/IBetModule";
import { FastifyReply } from 'fastify';
import { RetrieveBetsQuery } from '../../../../../../../application/features/retrieve-bets/RetrieveBetsQueryHandler';

@Controller('bets')
export class RetrieveBetsController {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @Get()
    async RetrieveBets(@Res() res: FastifyReply) {
        const bets = await this.betModule.ExecuteCommand(new RetrieveBetsQuery());
        return res.code(HttpStatus.OK).send(bets);
    }
}