import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { ApiProperty } from "@nestjs/swagger";
import { RegisterCommand } from "../../../../../../modules/users/src/application/features/register/RegisterCommand";
import { IUserModule } from "../../../../../../modules/users/src/application/abstractions/IUserModule";
import { RegisterPresenter } from "./registerPresenter";


export class RegisterRequest {
  @ApiProperty()  
  userId: string;
  @ApiProperty()  
  username: string;
  @ApiProperty()  
    email: string;
    @ApiProperty()  
    password: string;
}

@Controller('users')
export class RegisterController {
    constructor(@Inject(RegisterPresenter) private readonly presenter: RegisterPresenter,
                @Inject('IUserModule') private readonly userModule: IUserModule,
                ){}

  @Post()
  async create(@Body() input: RegisterRequest, @Res() res: FastifyReply) {
    await this.userModule.Execute(new RegisterCommand(input.userId, input.username, input.email, input.password))
    return this.presenter.BuildResponse(res);
  }
}