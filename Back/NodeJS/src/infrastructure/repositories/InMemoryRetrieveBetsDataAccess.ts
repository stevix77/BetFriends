import { IRetrieveBetsDataAccess, RetrieveBetsResponse } from '../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
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
                                              const member = this.memberRepository.GetMembers().find(y => y.MemberId == x.BettorId)
                                              const answers = this.answerBetRepository.Answers.filter(answer => answer.BetId == x.BetId)
                                              return {
                                                    Coins: x.Coins,
                                                    Description: x.Description,
                                                    EndDate: x.EndDate,
                                                    Id: x.BetId.Value,
                                                    BettorId: member!.MemberId.Value,
                                                    BettorName: member!.Username,
                                                    InvitedCount: x.Members.length,
                                                    AcceptedCount: answers.filter(a => a.Answer).length,
                                                    Answer: answers.find(a => a.GamberId.Value == userId)?.Answer
                                                }
                                            })
        return Promise.resolve(bets);
    }
}