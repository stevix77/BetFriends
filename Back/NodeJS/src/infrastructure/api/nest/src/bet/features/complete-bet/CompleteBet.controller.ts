import { Body, Controller, Inject, Param, Post, Res } from "@nestjs/common";
import { IBetModule } from "../../../../../../../application/Abstractions/IBetModule";
import { CompleteBetInput } from "./CompleteBetInput";
import { FastifyReply } from 'fastify';
import { CompleteBetPresenter } from "./CompleteBetPresenter";
import { CompleteBetCommand } from "../../../../../../../application/features/complete-bet/CompleteBetHandler";

@Controller('bets')
export class CompleteBetController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                private presenter: CompleteBetPresenter) {}

    @Post(':betId/complete')
    async Complete(@Body() input: CompleteBetInput, @Param('betId') betId: string, @Res() res: FastifyReply) {
        const command = new CompleteBetCommand(betId, input.isSuccessful, input.proof);
        await this.betModule.ExecuteCommand(command);
        return this.presenter.BuildResponse(res);
    }
}