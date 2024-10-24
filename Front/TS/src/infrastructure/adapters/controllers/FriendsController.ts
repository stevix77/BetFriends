import { RetrieveMembersHandler } from '../../../domain/features/RetrieveMembersHandler';
import { RetrieveFriendsHandler } from '../../../domain/features/RetrieveFriendsHandler'
import { AddFriendHandler } from '../../../domain/features/AddFriendHandler';

export class FriendsController {

    constructor(private retrieveFriendsHandler: RetrieveFriendsHandler,
                private retrieveMembersHandler: RetrieveMembersHandler,
                private addFriendHandler: AddFriendHandler){}

    GetFriends(): Promise<void> {
        return this.retrieveFriendsHandler.Handle();
    }

    SearchMembers(keyword: string): Promise<void> {
        return this.retrieveMembersHandler.Handle(keyword);
    }

    AddFriend(memberId: string): Promise<void> {
        return this.addFriendHandler.Handle({
            MemberId: memberId
        });
    }
}