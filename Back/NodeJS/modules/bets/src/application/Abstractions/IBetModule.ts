import { IRequest } from '../../../../shared/application/Request/IRequest';
export interface IBetModule {
    Execute<T>(request: IRequest<T>) : Promise<T>;
}