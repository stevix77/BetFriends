import { Bet } from '../../../domain/bets/Bet';
import { BetSummary, Gambler } from '../../../domain/bets/BetSummary';
import { IBetRepository } from '../../../domain/bets/IBetRepository';
import { InMemoryMemberRepository } from './InMemoryMemberRepository';
export class InMemoryBetRepository implements IBetRepository {
    constructor(private readonly memberRepository: InMemoryMemberRepository, 
                private bets: Bet[] = []){}
                
    AnswerAsync(BetId: string, Answer: boolean): unknown {
        throw new Error('Method not implemented.');
    }

    getAllAsync(): Promise<BetSummary[]> {
        const bets = this.bets.map<BetSummary>(x => {
            return {
                Coins: x.Coins,
                Description: x.Description,
                EndDate: x.EndDate,
                Id: x.Id,
                BookieId: "",
                OwnerName: x.Id.substring(0, 6),
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
        return Promise.resolve();
    }

}