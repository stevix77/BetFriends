import { Injectable } from "@angular/core";
import { IRouter, Route } from "../../../../../adapters/IRouter";
import { Router as AngularRouter} from "@angular/router"

@Injectable()
export class Router implements IRouter {
    constructor(private readonly router: AngularRouter) {}
    async Navigate(route: Route): Promise<void> {
        switch(route) {
            case Route.Home:
                await this.router.navigate([''])
                break;
            case Route.Signin:
                await this.router.navigate(['signin'])
                break;
            default:
                return;
        }
    }

}