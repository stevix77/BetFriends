import { ICommand } from "../../application/Abstractions/Request/ICommand";
import { BetCompleted } from "../../domain/bets/events/BetCompleted";
import { IDomainEvent } from "../../domain/IDomainEvent";
import { ICommandFactory } from "./ICommandFactory";
import { BetCreated } from '../../domain/bets/events/BetCreated';

export class CommandFactory implements ICommandFactory {
    Create(event: IDomainEvent): ICommand {
        switch(event.Type) {
            default:
                return undefined!;
        }
    }

}