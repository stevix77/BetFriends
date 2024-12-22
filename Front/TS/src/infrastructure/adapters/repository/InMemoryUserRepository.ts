import { IMemberGateway, MemberInfo } from '../../../domain/abstractions/IMemberGateway';
import { IUserContext } from '../../../domain/abstractions/IUserContext';
import { IUserGateway } from '../../../domain/abstractions/IUserGateway';
export class InMemoryUserRepository implements IUserGateway, IMemberGateway {
constructor(private readonly userContext: IUserContext, public readonly users: any[] = []){}
    RetrieveInfo(): Promise<MemberInfo> {
        const member = this.users.find(x => x.id == this.userContext.UserId);
        return Promise.resolve({
            coins: 2000,
            username: member.username
        })
    }

    Register(user: { id: string; username: string; email: string; password: string; }): Promise<void> {
        this.users.push(user);
        this.userContext.UserId = user.id
        return Promise.resolve();
    }

}