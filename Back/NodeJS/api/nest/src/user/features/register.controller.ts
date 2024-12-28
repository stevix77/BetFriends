import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { RegisterHandler } from "../../../../../modules/users/src/application/features/register/RegisterHandler";

@Controller('users')
export class RegisterController {
    constructor(@Inject(RegisterHandler) private readonly registerHandler: RegisterHandler) {}

  @Post()
  async create(@Body() input: RegisterRequest, @Res() res: FastifyReply) {
    
    return res.code(200).send()
  }
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

