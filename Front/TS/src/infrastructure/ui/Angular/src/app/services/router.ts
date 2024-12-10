import { Injectable } from "@angular/core";
import { IRouter, Route } from "../../../../../adapters/IRouter";
import { Router as AngularRouter} from "@angular/router"

@Injectable()
export class Router implements IRouter {
    constructor(private readonly router: AngularRouter) {}
    Navigate(route: Route): void {
        switch(route) {
            case Route.Home:
                this.router.navigate([''])
                break;
            case Route.Signin:
                this.router.navigate(['signin'])
                break;
            default:
                return;
        }
    }

}