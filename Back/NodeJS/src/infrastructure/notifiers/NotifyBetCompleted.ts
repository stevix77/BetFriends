import { INotifyBetCompleted, Message } from "../../application/features/complete-bet/NotifyGamblersBetCompletedHandler";

export class NotifyBetCompleted implements INotifyBetCompleted {
    constructor(private readonly messages: Message[] = []) {}
    Notify(message: Message): Promise<void> {
        this.messages.push(message);
        return Promise.resolve();
    }

}