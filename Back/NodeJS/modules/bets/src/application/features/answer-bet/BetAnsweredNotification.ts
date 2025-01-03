import { INotification } from "../../../../../shared/application/Request/INotification";

export class BetAnsweredNotification extends INotification {
    Name: string = BetAnsweredNotification.name;

    constructor(public BetId: string, public MemberId: string, public Answer: boolean){
        super();
    }

}