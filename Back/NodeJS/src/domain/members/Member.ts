import { MemberId } from './MemberId'
import { Friendship } from '../friendships/Friendship';
import { Bet } from '../bets/Bet';
import { BetId } from '../bets/BetId';
import { NotEnoughChipsException } from './exceptions/NotEnoughChipsException';
import { NoneFriendException } from './exceptions/NoneFriendException';

export class Member {
    
    Bet(betId: string, description: string, chips: number, endDate: Date, members: string[]): Bet {
        if(this.Chips < chips) {
            throw new NotEnoughChipsException();
        }

        if(this.CountFriend == 0) {
            throw new NoneFriendException();
        }

        return Bet.Create(new BetId(betId),
                        this.MemberId,
                        description,
                        chips,
                        endDate,
                        members);
    }

    DecreaseBalance(chips: number) {
        this.Chips -= chips; 
    }

    constructor(public readonly MemberId: MemberId, public Chips: number, public CountFriend: number){}

    AddFriendship(requesterId: string) {
        return Friendship.Create(new MemberId(requesterId), this.MemberId);
    }
}