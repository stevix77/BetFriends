import { IRequest } from "../../application/Abstractions/Request/IRequest";
import { Behavior } from "../../application/Abstractions/Behavior";

export class LoggingBehavior implements Behavior {

    Behavior: Behavior|undefined

    SetNext(behavior: Behavior) {
        this.Behavior = behavior;
        return behavior;
    }

    async Execute<T>(request: IRequest<T>): Promise<T> {
        let str = "";
        for(let obj in request){
            str += obj + " = " + request[obj] + " - "
        }

        console.log(new Date() + " " + str);
        
        if(this.Behavior) {
            const response = await this.Behavior.Execute<T>(request);
            console.log(new Date() + `request executed ${request.Name}`);
            return response;
        }
        return Promise.reject();
    }

}