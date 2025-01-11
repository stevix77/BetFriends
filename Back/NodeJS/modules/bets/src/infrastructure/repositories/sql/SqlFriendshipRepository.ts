import { DomainEventAccessor } from "../../../../../shared/infrastructure/events/DomainEventAccessor";
import { Friendship } from "../../../domain/friendships/Friendship";
import { IFriendshipRepository } from "../../../domain/friendships/IFriendshipRepository";
import { BetContext } from "../../DataAccess/BetContext";
import { FriendshipEntity } from "../../DataAccess/entities/FriendshipEntity";

export class SqlFriendshipRepository implements IFriendshipRepository {
    
    constructor(private readonly betContext: BetContext, 
                    private readonly domainEventAccessor: DomainEventAccessor
        ){}
        
    async SaveAsync(friendship: Friendship): Promise<void> {
        const entity = FriendshipEntity.Create(friendship);
        await this.betContext.FriendshipEntity.save(entity);
        this.domainEventAccessor.AddEvents(friendship.DomainEvents);
    }

}