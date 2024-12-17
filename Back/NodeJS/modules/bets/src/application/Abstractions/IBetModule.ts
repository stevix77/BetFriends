import { ICommand } from '../../../../shared/application/Request/ICommand';
import { INotification } from '../../../../shared/application/Request/INotification';
import { IRequest } from '../../../../shared/application/Request/IRequest';
export interface IBetModule {
    ExecuteNotification(notification: INotification): Promise<void>;
    ExecuteCommand(command: ICommand) : Promise<void>;
    ExecuteQuery<T>(query: IRequest<T>) : Promise<T>;
}