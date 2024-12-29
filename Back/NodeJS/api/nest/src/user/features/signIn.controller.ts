import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { SignInRequest } from "../../../../../modules/users/src/application/features/sign-in/SignInQuery"
import { SignInHandler } from "../../../../../modules/users/src/application/features/sign-in/SignInHandler";
import { FastifyReply } from "fastify";
import { ApiProperty } from "@nestjs/swagger";


export class AuthRequest {
  @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

@Controller('signin')
export class SignInController {
    constructor(@Inject(SignInHandler) private readonly signinHandler: SignInHandler) {}

  @Post()
  async create(@Body() input: AuthRequest, @Res() res: FastifyReply) {
    const authentication = await this.signinHandler.execute(new SignInRequest(input.email, input.password));
    if(authentication == undefined) {
      return res.code(400).send("Erreur d'identification");
    }
    return res.code(200).send(authentication)
  }
}