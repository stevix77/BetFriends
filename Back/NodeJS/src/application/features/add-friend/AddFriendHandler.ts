import { IFriendshipRepository } from "../../../domain/friendships/IFriendshipRepository";
import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { MemberId } from "../../../domain/members/MemberId";
import { IUserContext } from "../../Abstractions/IUserContext";

export class AddFriendCommandHandler {
    constructor(private friendshipRepository: IFriendshipRepository,
                private memberRepository: IMemberRepository,
                private userContext: IUserContext,
                private outputPort: IAddFriendOutputPort){}
    async Handle(request: AddFriendCommand): Promise<void> {
        const member = await this.memberRepository.GetByIdAsync(new MemberId(request.MemberId))
        if(member == undefined) {
            this.outputPort.MemberDoesNotExist(request.MemberId);
            return;
        }
        const friendship = member.AddFriendship(this.userContext.UserId)
        await this.friendshipRepository.SaveAsync(friendship);
        this.outputPort.Present();
    }
}
export interface AddFriendCommand {
    MemberId: string;
}

export interface IAddFriendOutputPort {
    MemberDoesNotExist(MemberId: string): void;
    Present(): void;

}