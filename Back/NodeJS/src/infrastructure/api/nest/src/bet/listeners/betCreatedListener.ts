import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../../application/Abstractions/IBetModule";
import { BetCreated } from "../../../../../../domain/bets/events/BetCreated";
import { BetCreatedNotification } from "../../../../../../application/features/create-bet/BetCreatedNotification"

@Injectable()
export class BetCreatedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetCreated.name)
    async Handle(event: BetCreated) {
        const notification = new BetCreatedNotification(event.BetId, event.MemberId, event.Coins);
        await this.betModule.ExecuteNotification(notification);
    }
}