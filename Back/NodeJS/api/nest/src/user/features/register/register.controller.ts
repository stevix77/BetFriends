import { Body, Controller, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { RegisterHandler } from "../../../../../../modules/users/src/application/features/register/RegisterHandler";
import { ApiProperty } from "@nestjs/swagger";
import { RegisterCommand } from "../../../../../../modules/users/src/application/features/register/RegisterCommand";
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
    constructor(private readonly presenter: RegisterPresenter,
              private readonly registerHandler: RegisterHandler,
                ){}

  @Post()
  async create(@Body() input: RegisterRequest, @Res() res: FastifyReply) {
    await this.registerHandler.execute(new RegisterCommand(input.userId, input.username, input.email, input.password))
    return this.presenter.BuildResponse(res);
  }
}