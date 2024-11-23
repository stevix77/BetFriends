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
    private readonly betsCompleted: Map<string, {isSuccess: boolean, proof?: string}> = new Map<string, {isSuccess: boolean, proof?: string}>();

    AnswerAsync(betId: string, answer: boolean): Promise<void> {
        const bet = this.bets.find(x => x.Id == betId);
        if(!bet) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
    
    CompleteAsync(betId: string, isSuccess: boolean, proof?: string): Promise<void> {
        const bet = this.bets.find(x => x.Id == betId);
        if(!bet) {
            return Promise.reject();
        }
        this.betsCompleted.set(betId, { isSuccess, proof })
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
                }),
                IsSuccess: this.betsCompleted.get(x.Id)?.isSuccess
            }
        });
        return Promise.resolve(bets)
    }

    GetProofAsync(betId: string): Promise<string> {
        const betCompleted = this.betsCompleted.get(betId);
        if(!betCompleted) {
            return Promise.reject(`bet ${betId} is not over`)
        }
        if(!betCompleted.isSuccess) {
            return Promise.reject(`bet ${betId} is not successful and has no proof`)
        }
        return Promise.resolve(betCompleted.proof!);
    }

    Save(bet: Bet): Promise<void> {
        this.bets.push(bet);
        this.betsUsers.set(bet.Id, this.userContext.UserId)
        return Promise.resolve();
    }

}