import { BetId } from "../../../domain/bets/BetId";
import { MemberId } from "../../../domain/members/MemberId";
import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetCreatedNotification implements INotification {
    constructor(public BetId: BetId, public MemberId: MemberId, public Coins: number){}
    Name: string = BetCreatedNotification.name;
}