import { IRetrieveBetsDataAccess, RetrieveBetsResponse } from '../../application/features/retrieve-bets/RetrieveBetsQueryHandler';
import { InMemoryBetRepository } from './InMemoryBetRepository';
export class InMemoryRetrieveBetsDataAccess implements IRetrieveBetsDataAccess {
    constructor(private readonly betRepository: InMemoryBetRepository) {}

    RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]> {
        const bets = this.betRepository.Bets.filter(x => x.MemberId.Value == userId ||
                                                        x.Members.some(y => y == userId))
                                                                    .map(x => {
                                                                        return {
                                                                            Chips: x.Chips,
                                                                            Description: x.Description,
                                                                            EndDate: x.EndDate,
                                                                            Id: x.BetId.Value,
                                                                            OwnerId: x.MemberId.Value
                                                                        }
                                                                    })
        return Promise.resolve(bets);
    }
}