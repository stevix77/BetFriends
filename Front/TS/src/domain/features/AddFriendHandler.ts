import { IFriendRepository } from "../friends/IFriendRepository";

export class AddFriendHandler {
    constructor(private friendRepository: IFriendRepository, 
                private addFriendOutputPort: IAddFriendOutputPort){}

    async Handle(request: IAddFriendRequest) : Promise<void> {
        await this.friendRepository.SaveAsync(request.MemberId);
        this.addFriendOutputPort.PresentMemberAdded(request.MemberId);
    }
}

export interface IAddFriendRequest {
    MemberId: string;
}

export interface IAddFriendOutputPort {
    PresentMemberAdded(memberId: string) : void;
}