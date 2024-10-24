import { BetId } from "../../../domain/bets/BetId";
import { MemberId } from "../../../domain/members/MemberId";
import { INotification } from "../../Abstractions/Request/INotification";

export class BetCreatedNotification implements INotification {
    constructor(public BetId: BetId, public MemberId: MemberId, public Chips: number){}
    Name: string = "BetCreatedNotification";
}