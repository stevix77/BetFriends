import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { IBetModule } from '../../../../../../../application/Abstractions/IBetModule';
import { FastifyReply } from 'fastify';
import { CreateBetCommand } from '../../../../../../../application/features/create-bet/CreateBetHandler';
import { CreateBetPresenter } from "./CreateBetPresenter";

export class CreateBetInput {
    description: string;
    chips: number;
    members: Array<string>;
    betId: string;
    endDate: string;
}

@Controller('bets')
export class CreateBetController {
    constructor(@Inject('IBetModule') private betModule: IBetModule,
                private presenter: CreateBetPresenter) {}

    @Post()
    async Create(@Body() createBetInput: CreateBetInput, @Res() res: FastifyReply) {
        await this.betModule.ExecuteCommand(new CreateBetCommand(createBetInput.betId,
                                                                createBetInput.description,
                                                                createBetInput.chips,
                                                                new Date(createBetInput.endDate),
                                                                createBetInput.members))
        return this.presenter.BuildResponse(res);
    }
}
