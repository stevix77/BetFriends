import { HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { Presenter } from "src/Presenter";
import { CreateBetResponse, type ICreateBetOutputPort } from "../../../../../../../application/features/CreateBetHandler";

export class CreateBetPresenter extends Presenter implements ICreateBetOutputPort {
    BuildResponse(res: FastifyReply) {
        res.code(this.response.code).send(this.response.body)
    }
    

    InvalidChips(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: {message: `bet should contains chips`} }
    }
    EndDateIsTooOld(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: {message: `end date is before current date`} }
    }
    RequesterIsUnknown(): void {
        this.response = { code: HttpStatus.FORBIDDEN, body: {message: `requester does not exist`} }
    }
    Present(createBetResponse: CreateBetResponse): void {
        this.response = { code: HttpStatus.CREATED, body: { betId: createBetResponse.BetId} }
    }

}