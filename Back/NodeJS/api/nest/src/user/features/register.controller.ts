import { Body, Controller, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { IRegisterOutputPort, RegisterHandler } from "../../../../../modules/users/src/application/features/register/RegisterHandler";
import { ApiProperty } from "@nestjs/swagger";
import { Presenter } from "src/Presenter";


export class RegisterRequest {
  @ApiProperty()  
  username: string;
  @ApiProperty()  
    email: string;
    @ApiProperty()  
    password: string;
}

@Controller('users')
export class RegisterController {
    constructor(@Inject(RegisterHandler) private readonly registerHandler: RegisterHandler,
                private readonly presenter: RegisterPresenter) {}

  @Post()
  async create(@Body() input: RegisterRequest, @Res() res: FastifyReply) {
    
    return this.presenter.BuildResponse(res);
  }
}

export class RegisterPresenter extends Presenter implements IRegisterOutputPort {
  UserAlreadyExists(): void {
    this.response = { code: HttpStatus.BAD_REQUEST, body: {  } }
  }

  BuildResponse(res: FastifyReply) {
    res.code(this.response.code).send(this.response.body)
  }

  Present(): void {
    this.response = { code: HttpStatus.CREATED, body: { } }
  }

}