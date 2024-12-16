import { MemberId } from './MemberId'
import { Friendship } from '../friendships/Friendship';
import { Bet } from '../bets/Bet';
import { BetId } from '../bets/BetId';
import { NotEnoughChipsException } from './exceptions/NotEnoughChipsException';
import { NoneFriendException } from './exceptions/NoneFriendException';
import { AnswerBet } from '../answerBets/AnswerBet';
import { IDateTimeProvider } from '../../../../shared/domain/IDateTimeProvider';

export class Member {
    
    
    Bet(betId: string, 
        description: string, 
        chips: number, 
        endDate: Date, 
        members: string[],
        dateTimeProvider: IDateTimeProvider): Bet {
        if(this.Coins < chips) {
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
                        members,
                        dateTimeProvider);
    }

    DecreaseBalance(coins: number) {
        this.Coins -= coins; 
    }

    IncreaseBalance(coins: number) {
        this.Coins += coins
    }

    constructor(public readonly MemberId: MemberId, 
                public readonly Username: string,
                public Coins: number, 
                public CountFriend: number){}

    AddFriendship(requesterId: string) {
        return Friendship.Create(new MemberId(requesterId), this.MemberId);
    }
    
    RejectBet(betId: BetId) {
        return new AnswerBet(betId, false, this.MemberId);
    }

    AcceptBet(betId: BetId) {
        return new AnswerBet(betId, true, this.MemberId);
    }
}