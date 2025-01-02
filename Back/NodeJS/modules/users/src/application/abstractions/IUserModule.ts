import { IRequest } from '../../../../shared/application/Request/IRequest';

export interface IUserModule {
    Execute<T>(request: IRequest<T>) : Promise<T>;
}