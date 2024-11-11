import type { IUserContext } from '../../../domain/abstractions/IUserContext';
import { Bet } from '../../../domain/bets/Bet';
import type { BetSummary, Gambler } from '../../../domain/bets/BetSummary';
import type { IBetRepository } from '../../../domain/bets/IBetRepository';
import { InMemoryMemberRepository } from './InMemoryMemberRepository';
export class InMemoryBetRepository implements IBetRepository {
    constructor(private readonly memberRepository: InMemoryMemberRepository, 
                private readonly userContext: IUserContext,
                private bets: Bet[] = []){}
                
    private readonly betsUsers: Map<string, string> = new Map<string, string>();

    AnswerAsync(betId: string, answer: boolean): Promise<void> {
        const bet = this.bets.find(x => x.Id == betId);
        if(!bet) {
            return Promise.reject();
        }
        return Promise.resolve();
    }

    GetAllAsync(): Promise<BetSummary[]> {
        const bets = this.bets.map<BetSummary>(x => {
            return {
                Coins: x.Coins,
                Description: x.Description,
                EndDate: x.EndDate,
                Id: x.Id,
                MaxAnswerDate: x.EndDate,
                BookieId: this.betsUsers.get(x.Id)!,
                BookieName: x.Id.substring(0, 6),
                Gamblers: x.Friends.map<Gambler>(idFriend => {
                    const member = this.memberRepository.members.find(member => member.Id == idFriend)
                    return {
                        Id: member!.Id,
                        Name: member!.Name,
                        HasAccepted: undefined
                    }
                })
            }
        });
        return Promise.resolve(bets)
    }

    Save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        this.betsUsers.set(bet.Id, this.userContext.UserId)
        return Promise.resolve();
    }

}