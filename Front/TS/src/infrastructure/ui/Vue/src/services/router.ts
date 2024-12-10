import { Route, type IRouter } from "../../../../adapters/IRouter";
import type { Router as VueRouter } from "vue-router";

export class Router implements IRouter {
    constructor(private readonly route: VueRouter) {}
    Navigate(route: Route): void {
        switch(route) {
            case Route.Home:
                this.route.push('/');
                break;
            case Route.Signin:
                this.route.push('signin')
                break;
            default:
                break;
        }
    }

}