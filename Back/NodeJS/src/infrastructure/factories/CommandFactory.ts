import { ICommand } from "../../application/Abstractions/Request/ICommand";
import { BetCompleted } from "../../domain/bets/events/BetCompleted";
import { IDomainEvent } from "../../domain/IDomainEvent";
import { BetCompletedCommand } from "../handlers/commands/BetCompletedCommand";
import { ICommandFactory } from "./ICommandFactory";
import { BetCreated } from '../../domain/bets/events/BetCreated';

export class CommandFactory implements ICommandFactory {
    Create(event: IDomainEvent): ICommand {
        switch(event.Type) {
            case BetCompleted.name:
                const domainEvent = event as BetCompleted;
                return new BetCompletedCommand(domainEvent.BetId.Value, domainEvent.IsSuccessful)
            case BetCreated.name:
                const betCreateddomainEvent = event as BetCreated;
                return new BetCompletedCommand(betCreateddomainEvent.BetId.Value, true)
            default:
                return undefined!;
        }
    }

}