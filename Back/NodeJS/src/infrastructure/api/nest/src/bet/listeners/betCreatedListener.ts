import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../../application/Abstractions/IBetModule";
import { BetCompletedCommand } from "../../../../../handlers/commands/BetCompletedCommand";

@Injectable()
export class BetCreatedListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent(BetCompletedCommand.name)
    async Handle(event: BetCompletedCommand) {
        await this.betModule.ExecuteCommand(event)
    }
}