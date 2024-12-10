import { AuthToken, ILoginOutputPort } from "../../../domain/features/LoginHandler"
import { Presenter } from "./Presenter";

export class LoginPresenter extends Presenter implements ILoginOutputPort {

    LoggedIn(authToken: AuthToken): void {
        this.subjects.get(Key.Connected.toString())?.forEach(subject => subject.next(authToken))
    }
    IncorrectCredentials(): void {
        this.subjects.get(Key.Error.toString())?.forEach(subject => subject.next("Erreur d'identification"))
    }
    PasswordEmpty(): void {
        this.subjects.get(Key.ErrorPassword.toString())?.forEach(subject => subject.next("Password requis"))
    }
    LoginIsEmpty(): void {
        this.subjects.get(Key.ErrorEmail.toString())?.forEach(subject => subject.next("Email requis"))
    }

}

export enum Key {
    Error,
    Connected,
    ErrorEmail,
    ErrorPassword
}