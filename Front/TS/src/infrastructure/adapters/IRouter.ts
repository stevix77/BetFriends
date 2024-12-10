export interface IRouter {
    Navigate(route: Route): void;

}

export enum Route {
    Home,
    Signin
}