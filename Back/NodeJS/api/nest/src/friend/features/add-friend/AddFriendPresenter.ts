import { HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { IAddFriendOutputPort } from '../../../../../../modules/bets/application/features/add-friend/AddFriendHandler'

export class AddFriendPresenter implements IAddFriendOutputPort {
    MemberDoesNotExist(memberId: string): void {
        this.response = { code: HttpStatus.BAD_REQUEST, body: {message: `member ${memberId} does not exist`} }
    }
    private response: { code: HttpStatus, body: any};

    Present() {
        this.response = { code: HttpStatus.CREATED, body:undefined }
    }

    BuildResponse(res: FastifyReply) {
        res.code(this.response.code).send(this.response.body);
    }

}