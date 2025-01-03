import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IBetModule } from "../../../../../modules/bets/src/application/Abstractions/IBetModule";
import { UserRegisteredNotification } from '../../../../../modules/bets/src/application/features/userRegistered/UserRegisteredNotification';

@Injectable()
export class UserRegisteredListener {
    constructor(@Inject('IBetModule') private betModule: IBetModule) {}

    @OnEvent("userregisteredintegrationevent")
    async Handle(event: string) {
        const data = JSON.parse(event)
        const notification = new UserRegisteredNotification(data["UserId"] as string, 
                                                                data["Username"] as string, 
                                                                data["Email"] as string);
        await this.betModule.Execute(notification);
    }
}