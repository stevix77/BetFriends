import { FriendDto } from '../../../domain/features/RetrieveFriendsHandler';
import { IFriendRepository } from "../../../domain/friends/IFriendRepository";
import { IMemberRepository, MemberDto } from '../../../domain/members/IMemberRepository';

export class InMemoryFriendRepository implements IFriendRepository {

    private friends: string[] = [];
    constructor(private memberRepository: IMemberRepository) {}
    async GetFriendsAsync(): Promise<FriendDto[]> {
        const members = await this.memberRepository.RetrieveByKeywordAsync("");
        return members.filter(x => x.IsFriend).map<FriendDto>((x) => ({
            Id: x.Id,
            Name: x.Name
        }) )
    }

    SaveAsync(memberId: string): Promise<void> {
        this.friends.push(memberId);
        return Promise.resolve();
    }

}