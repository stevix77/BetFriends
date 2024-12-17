import { ICommand } from "../../../../shared/application/Request/ICommand";
import { IDomainEvent } from "../../../../shared/domain/IDomainEvent";

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