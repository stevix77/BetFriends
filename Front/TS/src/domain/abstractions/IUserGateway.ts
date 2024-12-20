export interface IUserGateway {
    Register(user: { id: string; username: string; email: string; password: string; }): Promise<void>;

}