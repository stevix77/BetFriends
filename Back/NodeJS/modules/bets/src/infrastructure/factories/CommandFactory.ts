import { ICommand } from "../../application/Abstractions/Request/ICommand";
import { BetCompleted } from "../../domain/bets/events/BetCompleted";
import { IDomainEvent } from "../../domain/IDomainEvent";
import { BetCreated } from '../../domain/bets/events/BetCreated';

export class CommandFactory implements ICommandFactory {
    Create(event: IDomainEvent): ICommand {
        switch(event.Type) {
            default:
                return undefined!;
        }
    }

}

export interface ICommandFactory {
    Create(event: IDomainEvent): ICommand;

}