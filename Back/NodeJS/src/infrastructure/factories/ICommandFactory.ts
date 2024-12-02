import { ICommand } from "../../application/Abstractions/Request/ICommand";
import { IDomainEvent } from "../../domain/IDomainEvent";

export interface ICommandFactory {
    Create(event: IDomainEvent): ICommand;

}