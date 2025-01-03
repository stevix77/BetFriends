import { Body, Controller, Inject, Param, Post, Res } from "@nestjs/common";
import { IBetModule } from "../../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { CompleteBetInput } from "./CompleteBetInput";
import { FastifyReply } from 'fastify';
import { CompleteBetPresenter } from "./CompleteBetPresenter";
import { CompleteBetCommand } from "../../../../../../modules/bets/src/application/features/complete-bet/CompleteBetHandler";
import { FakeUserContext } from "src/userContext/FakeUserContext";

@Controller('bets')
export class CompleteBetController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                private presenter: CompleteBetPresenter) {}

    @Post(':betId/complete')
    async Complete(@Body() input: CompleteBetInput, @Param('betId') betId: string, @Res() res: FastifyReply) {
        const command = new CompleteBetCommand(betId, input.isSuccessful, input.proof);
        await this.betModule.Execute(command);
        return this.presenter.BuildResponse(res);
    }
}