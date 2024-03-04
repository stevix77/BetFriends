import { IRequest } from "../../Application/Abstractions/Request/Request";
import { Behavior } from "../../application/Abstractions/Behavior";

export class LoggingBehavior implements Behavior {

    Behavior: Behavior|undefined

    SetNext(behavior: Behavior) {
        this.Behavior = behavior;
        return this;
    }

    async Execute<T>(request: IRequest<T>): Promise<T> {
        let str = "";
        for(let obj in request){
            str += obj + " = " + request[obj] + " - "
        }

        console.log(new Date() + " " + str);
        
        if(this.Behavior) {
            return await this.Behavior.Execute(request);
        }
        return Promise.reject();
    }

}