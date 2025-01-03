import { BetId } from "../../../domain/bets/BetId";
import { MemberId } from "../../../domain/members/MemberId";
import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetCreatedNotification extends INotification {
    constructor(public BetId: BetId, public MemberId: MemberId, public Coins: number){
        super();
    }
    Name: string = BetCreatedNotification.name;
}