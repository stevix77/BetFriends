import { Controller, Get, HttpStatus, Inject, Res } from "@nestjs/common";
import { IBetModule } from "../../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { FastifyReply } from 'fastify';
import { RetrieveBetsQuery, RetrieveBetsResponse } from '../../../../../../modules/bets/src/application/features/retrieve-bets/RetrieveBetsQueryHandler';

@Controller('bets')
export class RetrieveBetsController {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @Get()
    async RetrieveBets(@Res() res: FastifyReply) {
        const bets = await this.betModule.ExecuteQuery<RetrieveBetsResponse[]>(new RetrieveBetsQuery());
        return res.code(HttpStatus.OK).send(bets);
    }
}