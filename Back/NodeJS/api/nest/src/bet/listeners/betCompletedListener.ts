import { Inject } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { BetCompletedEventNotification } from "../../../../../modules/bets/src/application/features/complete-bet/BetCompletedEventNotification";

export class BetCompletedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent("betcompletedintegrationevent")
    async Handle(event: string) {
        const data = JSON.parse(event)
        const notification = new BetCompletedEventNotification(data["betId"] as string, data["isSuccessful"] as boolean);
        await this.betModule.Execute(notification);
    }
}