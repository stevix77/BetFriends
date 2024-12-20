import { IRegisterOutputPort } from "../../../src/domain/features/RegisterHandler";

export class MockRegisterPresenter implements IRegisterOutputPort {
    PasswordsAreDifferent(): void {
        this.Error = "passwords are different"
    }
    FieldIsEmpty(): void {
        this.Error = "field is empty"
    }
    UserRegistered(userId: string): void {
        this.UserId = userId;
    }
    UserId?: string;
    Error?: string

}