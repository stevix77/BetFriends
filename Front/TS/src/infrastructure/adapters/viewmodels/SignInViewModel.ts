import { Subject } from "rxjs";
import { AuthToken, LoginHandler } from "../../../domain/features/LoginHandler"
import { IRouter, Route } from "../IRouter"
import { Key, LoginPresenter } from "../presenters/LoginPresenter";
import { Presenter } from "../presenters/Presenter";
import { IAuthenticateService } from "../IAuthenticateService";
export class SignInViewModel extends Presenter {
    constructor(private readonly loginHandler: LoginHandler,
                loginPresenter: LoginPresenter,
                router: IRouter,
                authService: IAuthenticateService
    ) {
        super();
        const loginSubject = new Subject<AuthToken>();
        loginSubject.subscribe(authToken => {
            authService.LoggedIn(authToken)
            router.Navigate(Route.Home)
        })
        loginPresenter.Subscribe(Key.Connected.toString(), loginSubject)
        const loginErrorSubject = new Subject<string>();
        loginErrorSubject.subscribe(errorMessage => this.error = errorMessage)
        const loginErrorPasswordSubject = new Subject<string>();
        loginErrorPasswordSubject.subscribe(errorMessage => this.errorPassword = errorMessage)
        const loginErrorEmailSubject = new Subject<string>();
        loginErrorEmailSubject.subscribe(errorMessage => this.errorEmail = errorMessage)
        loginPresenter.Subscribe(Key.Error.toString(), loginErrorSubject)
        loginPresenter.Subscribe(Key.ErrorEmail.toString(), loginErrorEmailSubject)
        loginPresenter.Subscribe(Key.ErrorPassword.toString(), loginErrorPasswordSubject)
    }

    email?: string;
    password?: string;
    error?: string;
    errorEmail?: string;
    errorPassword?: string;

    async Signin(): Promise<void> {
        this.ResetErrors();
        await this.loginHandler.Handle({
            email: this.email!,
            password: this.password!
        })
    }

    private ResetErrors() {
        this.error = undefined;
        this.errorEmail = undefined;
        this.errorPassword = undefined;
    }
}