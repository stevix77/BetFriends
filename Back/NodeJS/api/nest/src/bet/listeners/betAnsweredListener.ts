import { OnEvent } from "@nestjs/event-emitter";
import { BetAnswered } from "../../../../../modules/bets/src/domain/answerBets/events/BetAnswered";
import { Inject, Injectable } from "@nestjs/common";
import { IBetModule } from "../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { BetAnsweredNotification } from "../../../../../modules/bets/src/application/features/answer-bet/BetAnsweredNotification"
@Injectable()
export class BetAnsweredListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetAnswered.name)
    async Handle(event: BetAnswered) {
        const notification = new BetAnsweredNotification(event.BetId.Value, event.GamblerId.Value, event.Answer);
        await this.betModule.ExecuteNotification(notification);
    }
}