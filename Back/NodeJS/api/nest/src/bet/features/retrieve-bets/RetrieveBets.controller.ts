import { Controller, Get, HttpStatus, Inject, Res } from "@nestjs/common";
import { IBetModule } from "../../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { FastifyReply } from 'fastify';
import { RetrieveBetsQuery, RetrieveBetsResponse } from '../../../../../../modules/bets/src/application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { FakeUserContext } from "src/userContext/FakeUserContext";

@Controller('bets')
export class RetrieveBetsController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                @Inject('IUserContext')private userContext: FakeUserContext) {}

    @Get()
    async RetrieveBets(@Res() res: FastifyReply) {
        this.userContext.SetRequest(res.getHeaders());
        const bets = await this.betModule.Execute<RetrieveBetsResponse[]>(new RetrieveBetsQuery());
        return res.code(HttpStatus.OK).send(bets);
    }
}