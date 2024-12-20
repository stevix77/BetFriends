import { IUserGateway } from "../../../src/domain/abstractions/IUserGateway";

export class MockUserGateway implements IUserGateway {
    Register(user: { id: string; username: string; email: string; password: string; }): Promise<void> {
        this.User = user;
        return Promise.resolve();
    }
    User: any;

}
