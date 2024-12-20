import { IRegisterOutputPort } from "../../../src/domain/features/RegisterHandler";

export class MockRegisterPresenter implements IRegisterOutputPort {
    UserRegistered(userId: string): void {
        this.UserId = userId;
    }
    UserId: any;

}