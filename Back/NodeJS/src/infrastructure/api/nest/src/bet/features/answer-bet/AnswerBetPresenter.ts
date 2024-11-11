import { Presenter } from "src/Presenter";
import { AnswerResponse, IAnswerBetOutputPort } from "../../../../../../../application/features/answer-bet/AnswerBetHandler";
import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';

export class AnswerBetPresenter extends Presenter implements IAnswerBetOutputPort {
    
    BuildResponse(res: FastifyReply) {
        res.code(this.response.code).send(this.response.body)
    }
    DateToAnswerIsOver(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `The date to answer is over` } }
    }
    MemberHasNotEnoughCoins(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `You have not enough coins to answer to this bet` } }
    }
    MemberDoesNotExisting(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `this member does not exist` } }
    }
    UserCannotAnswerOnThisBet(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `You are not authorized to answer to this bet` } }
    }
    BetDoesNotExist(betId: string): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `Bet with id ${betId} does not exist` } }
    }
    UserCannotAnswerToOwnBet(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: "You cannot answer to your own bet" } }
    }
    Present(answerResponse: AnswerResponse): void {
        this.response = { code: HttpStatus.OK, body: { } }
    }

}