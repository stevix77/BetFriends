import { RetrieveMembersHandler } from '../../../domain/features/retrieveMembers/RetrieveMembersHandler';
import { RetrieveFriendsHandler } from '../../../domain/features/retrieveFriends/RetrieveFriendsHandler'
import { AddFriendHandler } from '../../../domain/features/add-friend/AddFriendHandler';

export class FriendsController {

    constructor(private retrieveFriendsHandler: RetrieveFriendsHandler,
                private retrieveMembersHandler: RetrieveMembersHandler,
                private addFriendHandler: AddFriendHandler){}

    GetFriends(): Promise<void> {
        return this.retrieveFriendsHandler.Handle();
    }

    SearchMembers(keyword: string): Promise<void> {
        console.log(keyword)
        return this.retrieveMembersHandler.Handle(keyword);
    }

    AddFriend(memberId: string): Promise<void> {
        return this.addFriendHandler.Handle({
            MemberId: memberId
        });
    }

    vm: any = {
        ShowFriends: true
    }
}