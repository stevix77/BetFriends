import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { IBetModule } from '../../../../../../modules/bets/src/application/Abstractions/IBetModule';
import { FastifyReply } from 'fastify';
import { CreateBetCommand } from '../../../../../../modules/bets/src/application/features/create-bet/CreateBetHandler';
import { CreateBetPresenter } from "./CreateBetPresenter";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBetInput {
    @ApiProperty()  
    description: string;
    @ApiProperty()  
    coins: number;
    @ApiProperty()  
    members: Array<string>;
    @ApiProperty()  
    betId: string;
    @ApiProperty()  
    endDate: string;
}

@Controller('bets')
export class CreateBetController {
    constructor(@Inject('IBetModule') private readonly betModule: IBetModule,
                private readonly presenter: CreateBetPresenter) {}

    @Post()
    async Create(@Body() createBetInput: CreateBetInput, @Res() res: FastifyReply) {
        await this.betModule.ExecuteCommand(new CreateBetCommand(createBetInput.betId,
                                                                createBetInput.description,
                                                                createBetInput.coins,
                                                                new Date(createBetInput.endDate),
                                                                createBetInput.members))
        return this.presenter.BuildResponse(res);
    }
}
