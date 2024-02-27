import type { FriendDto, IRetrieveFriendsOutputPort } from "../../../../../domain/features/retrieveFriends/RetrieveFriendsHandler";
import { FriendsController } from '../../../../adapters/controllers/FriendsController'

export class RetrieveFriendsPresenter implements IRetrieveFriendsOutputPort {
  constructor(){}
  Present(friends: FriendDto[]): void {
    this.controller!.vm.Friends = friends;
  }
  
  Subscribe(controller: FriendsController) {
    this.controller = controller;
  }

  private controller: FriendsController|undefined = undefined;
}