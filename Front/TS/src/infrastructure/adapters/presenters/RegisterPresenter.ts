import { Presenter } from './Presenter';
import { IRegisterOutputPort } from '../../../domain/features/RegisterHandler';
export class RegisterPresenter extends Presenter implements IRegisterOutputPort {
    UserRegistered(userId: string): void {
        this.subjects.get(Key.Registered.toString())?.forEach(subject => subject.next(userId))
    }

}

export enum Key {
    Error,
    Registered
}