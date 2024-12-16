import { Body, Controller, Inject, Post, Res, Param } from "@nestjs/common";
import { IBetModule } from '../../../../../../modules/bets/application/Abstractions/IBetModule';
import { FastifyReply } from 'fastify';
import { AnswerBetCommand } from '../../../../../../modules/bets/application/features/answer-bet/AnswerBetHandler'
import { AnswerBetPresenter } from "./AnswerBetPresenter";

@Controller('bets')
export class AnswerBetController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                private presenter: AnswerBetPresenter) {}

    @Post(':betId/answer')
    async Create(@Param('betId') betId: string, @Body() answerBetInput: AnswerBetInput, @Res() res: FastifyReply) {
        await this.betModule.ExecuteCommand(new AnswerBetCommand(betId, answerBetInput.Answer))
        return this.presenter.BuildResponse(res);
    }
}

export interface AnswerBetInput {
    Answer: boolean
}