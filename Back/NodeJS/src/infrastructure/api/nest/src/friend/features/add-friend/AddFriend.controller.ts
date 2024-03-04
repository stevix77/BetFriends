import { Controller, Param, Post, Res } from "@nestjs/common";
import { AddFriendCommandHandler } from "../../../../../../../application/features/add-friend/AddFriendHandler";
import { AddFriendPresenter } from "./AddFriendPresenter";

@Controller('friends')
export class AddFriendController {
  constructor(private handler: AddFriendCommandHandler,
              private presenter: AddFriendPresenter) {}

  @Post(':memberId')
    async Create(@Param() memberId: string, @Res() res) {
        await this.handler.Handle({
          MemberId: memberId
        });
        return this.presenter.BuildResponse(res);
    }
  
}