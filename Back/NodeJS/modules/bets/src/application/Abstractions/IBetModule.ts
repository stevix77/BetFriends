import { ICommand } from '../../../../shared/application/Request/ICommand';
import { INotification } from '../../../../shared/application/Request/INotification';
import { IRequest } from '../../../../shared/application/Request/IRequest';
export interface IBetModule {
    Execute<T>(request: IRequest<T>) : Promise<T>;
}