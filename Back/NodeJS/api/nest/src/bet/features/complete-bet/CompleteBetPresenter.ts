import { Presenter } from "src/Presenter";
import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';
import { CompleteBetResponse, ICompleteBetOutputPort } from "../../../../../../modules/bets/src/application/features/complete-bet/CompleteBetHandler";

export class CompleteBetPresenter extends Presenter implements ICompleteBetOutputPort {
    BuildResponse(res: FastifyReply) {
        res.code(this.response.code).send(this.response.body)
    }
    
    UnAuthorized(userId: string): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `User ${userId} is not authorize to close this bet` } }
    }
    SuccessfulBetNeedsProof(): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `A successful bet needs a proof` } }
    }
    BetDoesNotExist(betId: string): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: { Message: `Bet ${betId} does not exist` } }
    }
    Present(response: CompleteBetResponse): void {
        this.response = { code: HttpStatus.OK, body: {  } }
    }

}