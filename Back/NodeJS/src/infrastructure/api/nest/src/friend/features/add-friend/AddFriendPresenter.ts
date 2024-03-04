import { BadRequestException, HttpStatus } from '@nestjs/common';
import { IAddFriendOutputPort } from '../../../../../../../application/features/add-friend/AddFriendHandler'

export class AddFriendPresenter implements IAddFriendOutputPort {
    MemberDoesNotExist(MemberId: string): void {
        throw new BadRequestException(`member ${MemberId} does not exist`);
    }
    private response: any;

    Present() {
        this.response = { HttpStatusCode: HttpStatus.CREATED }
    }

    BuildResponse(res: Response<any, Record<string, any>>): Response {
        return res.status(this.response.HttpStatusCode).json(this.response.Body)
    }

}