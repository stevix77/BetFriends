import { IRegisterOutputPort } from "../../../src/application/features/register/RegisterHandler";

export class MockRegisterOutputPort implements IRegisterOutputPort {
    UserAlreadyExists(): void {
        this.Message = "not registered"
    }
    Present(): void {
        this.Message = "registered"
    }
    Message: string;

}