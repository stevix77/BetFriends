import { Request } from '../Abstractions/Request/Request'
export interface Behavior {
    Execute<T>(request: Request): Promise<T>;
    SetNext(behavior: Behavior): Behavior;
    Behavior: Behavior|undefined;
}