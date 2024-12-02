import { ICommand } from './Request/ICommand';
import { INotification } from './Request/INotification';
import { IRequest } from './Request/IRequest';
export interface IBetModule {
    ExecuteNotification(notification: INotification): Promise<void>;
    ExecuteCommand(command: ICommand) : Promise<void>;
    ExecuteQuery<T>(query: IRequest<T>) : Promise<T>;
}