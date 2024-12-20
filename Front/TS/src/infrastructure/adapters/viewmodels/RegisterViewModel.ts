import { Subject } from 'rxjs';
import { AuthToken, LoginHandler } from '../../../domain/features/LoginHandler';
import { Presenter } from '../presenters/Presenter';
import { Key as RegisterKey, RegisterPresenter } from '../presenters/RegisterPresenter';
import { Key as LoginKey } from '../presenters/LoginPresenter';
import { RegisterHandler } from '../../../domain/features/RegisterHandler';
import { LoginPresenter } from '../presenters/LoginPresenter';
import { IAuthenticateService } from '../IAuthenticateService';
import { IRouter, Route } from '../IRouter';

export class RegisterViewModel extends Presenter {
    constructor(loginHandler: LoginHandler,
                registerPresenter: RegisterPresenter,
                private readonly registerHandler: RegisterHandler,
                loginPresenter: LoginPresenter,
                router: IRouter,
                authService: IAuthenticateService){
        super();
        const registerErrorSubject = new Subject<string>();
        registerErrorSubject.subscribe((error) => this.error = error)
        const registerSubject = new Subject<string>()
        registerSubject.subscribe(async (userId) => {
            await loginHandler.Handle({
                email: this.email!,
                password: this.password!
            })
        })
        const loginSubject = new Subject<AuthToken>();
        loginSubject.subscribe((authToken) => {
            authService.LoggedIn(authToken)
            router.Navigate(Route.Home)
        })
        registerPresenter.Subscribe(RegisterKey.Error.toString(), registerErrorSubject)
        registerPresenter.Subscribe(RegisterKey.Registered.toString(), registerSubject)
        loginPresenter.Subscribe(LoginKey.Connected.toString(), loginSubject)
    }

    error?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;

    Register(): Promise<void> {
        this.ResetError();
        return this.registerHandler.Handle({
            username: this.username!,
            email: this.email!,
            password: this.password!,
            confirmPassword: this.confirmPassword!
        });
    }

    private ResetError() {
        this.error = undefined;
    }
}