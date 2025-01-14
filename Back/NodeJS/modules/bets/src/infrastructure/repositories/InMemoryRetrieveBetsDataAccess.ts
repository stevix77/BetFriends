import { GamblerDto, IRetrieveBetsDataAccess, RetrieveBetsResponse } from '../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { InMemoryBetAnswerRepository } from './InMemoryBetAnswerRepository';
import { InMemoryBetRepository } from './InMemoryBetRepository';
import { InMemoryMemberRepository } from './InMemoryMemberRepository';
export class InMemoryRetrieveBetsDataAccess implements IRetrieveBetsDataAccess {
    constructor(private readonly betRepository: InMemoryBetRepository,
                private readonly memberRepository: InMemoryMemberRepository,
                private readonly answerBetRepository: InMemoryBetAnswerRepository) {}

    RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]> {
        const bets = this.betRepository.Bets.filter(x => x.BettorId.Value == userId ||
                                                        x.Members.some(y => y == userId))
                                            .map(x => {
                                                const member = this.memberRepository.GetMembers().find(y => y.GetSnapshot().MemberId == x.BettorId.Value)
                                                const answers = this.answerBetRepository.Answers.filter(answer => answer.BetId == x.BetId)
                                                return {
                                                    Coins: x.Coins,
                                                    Description: x.Description,
                                                    EndDate: x.EndDate,
                                                    Id: x.BetId.Value,
                                                    BookieId: member!.GetSnapshot().MemberId,
                                                    BookieName: member!.GetSnapshot().Username,
                                                    MaxAnswerDate: x.MaxAnswerDate,
                                                    Gamblers: x.Members.map<GamblerDto>(m => {
                                                        const gambler = this.memberRepository.GetMembers().find(g => g.GetSnapshot().MemberId == m);
                                                        return {
                                                            Id: m,
                                                            Name: gambler!.GetSnapshot().Username,
                                                            HasAccepted: answers.find(a => a.GamblerId.Value == m)?.Answer
                                                        }
                                                    })
                                                }
                                            })
        return Promise.resolve(bets);
    }
}