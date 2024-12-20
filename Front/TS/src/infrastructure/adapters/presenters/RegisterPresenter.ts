import { Presenter } from './Presenter';
import { IRegisterOutputPort } from '../../../domain/features/RegisterHandler';
export class RegisterPresenter extends Presenter implements IRegisterOutputPort {
    PasswordsAreDifferent(): void {
        this.subjects.get(Key.PasswordsDifferent.toString())?.forEach(subject => subject.next(undefined))
    }
    FieldIsEmpty(): void {
        this.subjects.get(Key.FieldEmpty.toString())?.forEach(subject => subject.next(undefined))
    }
    UserRegistered(userId: string): void {
        this.subjects.get(Key.Registered.toString())?.forEach(subject => subject.next(userId))
    }

}

export enum Key {
    PasswordsDifferent,
    FieldEmpty,
    Registered
}