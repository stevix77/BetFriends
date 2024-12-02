import { ICommand } from "../../application/Abstractions/Request/ICommand";
import { BetCompleted } from "../../domain/bets/events/BetCompleted";
import { IDomainEvent } from "../../domain/IDomainEvent";
import { BetCompletedCommand } from "../handlers/commands/BetCompletedCommand";
import { ICommandFactory } from "./ICommandFactory";

export class CommandFactory implements ICommandFactory {
    Create(event: IDomainEvent): ICommand {
        console.log(`commandFactory: ${typeof BetCompleted}`)
        switch(event) {
            case typeof BetCompleted:
                const domainEvent = event as BetCompleted;
                return new BetCompletedCommand(domainEvent.BetId.Value, domainEvent.IsSuccessful)
            default:
                return undefined!;
        }
    }

}