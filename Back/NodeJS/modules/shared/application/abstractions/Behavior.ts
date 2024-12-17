import { Request } from '../../application/Request/IRequest'
export interface Behavior {
    Execute<T>(request: Request): Promise<T>;
    SetNext(behavior: Behavior): Behavior;
    Behavior: Behavior|undefined;
}