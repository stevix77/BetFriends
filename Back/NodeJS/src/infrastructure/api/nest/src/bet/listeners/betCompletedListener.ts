import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../../application/Abstractions/IBetModule";
import { BetCompleted } from "../../../../../../domain/bets/events/BetCompleted";
import { BetCompletedNotification } from "../../../../../handlers/notifications/betCompleted/BetCompletedNotification";

export class BetCompletedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetCompleted.name)
    async Handle(event: BetCompleted) {
        const notification = new BetCompletedNotification(event.BetId.Value, event.IsSuccessful);
        await this.betModule.ExecuteNotification(notification);
    }
}