import { IFriendshipRepository } from "../../../domain/friendships/IFriendshipRepository";
import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { MemberId } from "../../../domain/members/MemberId";
import { IUserContext } from "../../Abstractions/IUserContext";
import { ICommand } from '../../Abstractions/Request/ICommand';
import { IRequestHandler } from '../../Abstractions/Request/IRequestHandler';

export class AddFriendCommandHandler implements IRequestHandler<AddFriendCommand, void> {
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
        const friendship = member.AddFriendship(this.userContext.GetUserId())
        await this.friendshipRepository.SaveAsync(friendship);
        this.outputPort.Present();
    }

    GetRequestType(): string {
        return AddFriendCommand.name;
    }
}
export class AddFriendCommand implements ICommand {
    constructor(public readonly MemberId: string){}
    Name: string = AddFriendCommand.name;
}

export interface IAddFriendOutputPort {
    MemberDoesNotExist(MemberId: string): void;
    Present(): void;

}