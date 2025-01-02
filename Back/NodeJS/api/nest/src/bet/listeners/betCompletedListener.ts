import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { BetCompleted } from "../../../../../modules/bets/src/domain/bets/events/BetCompleted";
import { BetCompletedNotification } from "../../../../../modules/bets/src/application/features/complete-bet/BetCompletedNotification";

export class BetCompletedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetCompleted.name)
    async Handle(event: BetCompleted) {
        const notification = new BetCompletedNotification(event.BetId.Value, event.IsSuccessful);
        await this.betModule.Execute(notification);
    }
}