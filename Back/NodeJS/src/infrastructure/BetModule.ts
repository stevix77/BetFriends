import { ICommand } from "../application/Abstractions/Request/ICommand";
import { IBetModule } from "../application/Abstractions/IBetModule";
import { Behavior } from '../application/Abstractions/Behavior';

export class BetModule implements IBetModule {
    constructor(private behavior: Behavior) {}

    async ExecuteCommand(command: ICommand): Promise<void> {
        return this.behavior.Execute(command);
    }

}