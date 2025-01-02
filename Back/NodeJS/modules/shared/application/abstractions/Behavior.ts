import { Request } from '../../application/Request/IRequest'
export interface Behavior {
    Execute(request: Request): Promise<any>;
    SetNext(behavior: Behavior): Behavior;
    Behavior: Behavior|undefined;
}