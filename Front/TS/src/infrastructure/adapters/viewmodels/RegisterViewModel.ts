import { Subject } from 'rxjs';
import { LoginHandler } from '../../../domain/features/LoginHandler';
import { Presenter } from '../presenters/Presenter';
import { Key, RegisterPresenter } from '../presenters/RegisterPresenter';
import { RegisterHandler } from '../../../domain/features/RegisterHandler';

export class RegisterViewModel extends Presenter {
    constructor(loginHandler: LoginHandler,
                registerPresenter: RegisterPresenter,
                private readonly registerHandler: RegisterHandler){
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
        registerPresenter.Subscribe(Key.Error.toString(), registerErrorSubject)
        registerPresenter.Subscribe(Key.Registered.toString(), registerSubject)
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