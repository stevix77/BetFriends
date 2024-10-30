import { IRetrieveBetsDataAccess, RetrieveBetsResponse } from '../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { MemberId } from '../../domain/members/MemberId';
import { InMemoryBetRepository } from './InMemoryBetRepository';
import { InMemoryMemberRepository } from './InMemoryMemberRepository';
export class InMemoryRetrieveBetsDataAccess implements IRetrieveBetsDataAccess {
    constructor(private readonly betRepository: InMemoryBetRepository,
                private readonly memberRepository: InMemoryMemberRepository) {}

    RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]> {
        const bets = this.betRepository.Bets.filter(x => x.MemberId.Value == userId ||
                                                        x.Members.some(y => y == userId))
                                            .map(x => {
                                              const member = this.memberRepository.GetMembers().find(y => y.MemberId == x.MemberId)
                                              return {
                                                    Chips: x.Chips,
                                                    Description: x.Description,
                                                    EndDate: x.EndDate,
                                                    Id: x.BetId.Value,
                                                    OwnerId: member!.MemberId.Value,
                                                    OwnerName: member!.Username    
                                                }
                                            })
        return Promise.resolve(bets);
    }
}