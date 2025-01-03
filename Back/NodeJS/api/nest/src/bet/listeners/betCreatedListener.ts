import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { BetCreatedEventNotification } from "../../../../../modules/bets/src/application/features/create-bet/BetCreatedEventNotification";

@Injectable()
export class BetCreatedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent("betcreatedintegrationevent")
    async Handle(event: string) {
        const data = JSON.parse(event)
        const notification = new BetCreatedEventNotification(data["betId"] as string);
        await this.betModule.Execute(notification);
    }
}