import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../../application/Abstractions/IBetModule";
import { BetCreated } from "../../../../../../domain/bets/events/BetCreated";

@Injectable()
export class BetCreatedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetCreated.name)
    async Handle(event: BetCreated) {
        console.log(event)
    }
}