import { Controller, Inject, Param, Post, Res } from "@nestjs/common";
import { AddFriendCommand } from "../../../../../../modules/bets/src/application/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from "./AddFriendPresenter";
import { IBetModule } from '../../../../../../modules/bets/src/application/Abstractions/IBetModule';
import { FastifyReply } from 'fastify';
import { FakeUserContext } from "src/userContext/FakeUserContext";

@Controller('friends')
export class AddFriendController {
  constructor(@Inject('IBetModule')private module: IBetModule,
              private presenter: AddFriendPresenter,
              @Inject('IUserContext')private userContext: FakeUserContext) {}

  @Post(':memberId')
    async Create(@Param('memberId') memberId: string, @Res() res: FastifyReply) {
        this.userContext.SetRequest(res.getHeaders());
        await this.module.Execute(new AddFriendCommand(memberId));
        this.presenter.BuildResponse(res);
    }
  
}