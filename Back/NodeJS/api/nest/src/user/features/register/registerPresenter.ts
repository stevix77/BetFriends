import { HttpStatus } from "@nestjs/common"
import { FastifyReply } from "fastify"
import { Presenter } from "src/Presenter"
import { IRegisterOutputPort } from "../../../../../../modules/users/src/application/features/register/RegisterHandler"

export class RegisterPresenter extends Presenter implements IRegisterOutputPort {
  UserAlreadyExists(): void {
    this.response = { code: HttpStatus.BAD_REQUEST, body: {  } }
  }

  Present(): void {
    this.response = { code: HttpStatus.CREATED, body: { } }
  }

  BuildResponse(res: FastifyReply) {
    res.code(this.response.code).send(this.response.body)
  }

}