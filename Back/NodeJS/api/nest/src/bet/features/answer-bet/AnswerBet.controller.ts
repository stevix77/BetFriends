import { Body, Controller, Inject, Post, Res, Param } from "@nestjs/common";
import { IBetModule } from '../../../../../../modules/bets/src/application/Abstractions/IBetModule';
import { FastifyReply } from 'fastify';
import { AnswerBetCommand } from '../../../../../../modules/bets/src/application/features/answer-bet/AnswerBetHandler'
import { AnswerBetPresenter } from "./AnswerBetPresenter";
import { ApiProperty } from "@nestjs/swagger";
import { FakeUserContext } from "src/userContext/FakeUserContext";

export class AnswerBetInput {
    @ApiProperty()  
    Answer: boolean
}

@Controller('bets')
export class AnswerBetController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                private presenter: AnswerBetPresenter,
                @Inject('IUserContext')private userContext: FakeUserContext) {}

    @Post(':betId/answer')
    async Create(@Param('betId') betId: string, @Body() answerBetInput: AnswerBetInput, @Res() res: FastifyReply) {
        this.userContext.SetRequest(res.getHeaders());
        await this.betModule.Execute(new AnswerBetCommand(betId, answerBetInput.Answer))
        return this.presenter.BuildResponse(res);
    }
}