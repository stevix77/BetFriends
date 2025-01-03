import { MemberId } from './MemberId'
import { Friendship } from '../friendships/Friendship';
import { Bet } from '../bets/Bet';
import { BetId } from '../bets/BetId';
import { NotEnoughChipsException } from './exceptions/NotEnoughChipsException';
import { NoneFriendException } from './exceptions/NoneFriendException';
import { AnswerBet } from '../answerBets/AnswerBet';
import { IDateTimeProvider } from '../../../../shared/domain/IDateTimeProvider';
import { MemberSnapshot } from './MemberSnapshot';

export class Member {
    static FromSnapshot(snapshot: MemberSnapshot): Member {
        return new Member(new MemberId(snapshot.MemberId), snapshot.Username, snapshot.Coins, snapshot.CountFriends)
    }
    
    static Create(memberId: string, username: string): Member {
        return new Member(new MemberId(memberId), username, 2000, 0)
    }

    private constructor(private readonly memberId: MemberId, 
                private readonly username: string,
                private coins: number, 
                private countFriend: number){}

    Bet(betId: string, 
        description: string, 
        coins: number, 
        endDate: Date, 
        members: string[],
        dateTimeProvider: IDateTimeProvider): Bet {
        if(this.coins < coins) {
            throw new NotEnoughChipsException();
        }

        if(this.countFriend == 0) {
            throw new NoneFriendException();
        }

        return Bet.Create(new BetId(betId),
                        this.memberId,
                        description,
                        coins,
                        endDate,
                        members,
                        dateTimeProvider);
    }

    DecreaseBalance(coins: number) {
        this.coins -= coins; 
    }

    IncreaseBalance(coins: number) {
        this.coins += coins
    }
    
    CanBet(bet: Bet): boolean {
        if(this.coins < bet.Coins) {
            return false;
        }
        return true;
    }

    AddFriendship(requesterId: string) {
        return Friendship.Create(new MemberId(requesterId), this.memberId);
    }
    
    RejectBet(betId: BetId) {
        return new AnswerBet(betId, false, this.memberId);
    }

    AcceptBet(betId: BetId) {
        return new AnswerBet(betId, true, this.memberId);
    }

    GetSnapshot(): MemberSnapshot {
        return new MemberSnapshot(this.memberId.Value,
                                this.username,
                                this.coins,
                                this.countFriend)
    }
}