import { Behavior } from "../../application/Abstractions/Behavior";
import { IRequest } from "../../application/Abstractions/Request/IRequest";
import { IDomainEventDispatcher } from "../events/IDomainEventDispatcher";
import { IUnitOfWork } from "../uow/IUnitOfWork";

export class UnitOfWorkBehavior implements Behavior {

    constructor(private unitOfWork: IUnitOfWork, 
                private domainEventsDispatcher: IDomainEventDispatcher) {}
    Behavior: Behavior|undefined;
    
    SetNext(behavior: Behavior): Behavior {
        this.Behavior = behavior;
        return this;
    }
    
    async Execute<T>(request: IRequest<T>): Promise<T> {
        try {
            if(this.Behavior) {
                await this.unitOfWork.Begin();
                const result = await this.Behavior.Execute<T>(request);
                await this.domainEventsDispatcher.Dispatch();
                await this.unitOfWork.Commit();
                return result;
            }
            return Promise.reject();
        } catch(error) {
            await this.unitOfWork.Rollback();
            throw error;
        }
    }

}