import { IUserGateway } from '../../../domain/abstractions/IUserGateway';
export class InMemoryUserRepository implements IUserGateway {
constructor(public readonly users: any[] = []){}

    Register(user: { id: string; username: string; email: string; password: string; }): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

}