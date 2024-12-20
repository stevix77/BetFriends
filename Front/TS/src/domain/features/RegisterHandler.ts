import { IIdGenerator } from "../abstractions/IIdGenerator";
import { IUserGateway } from "../abstractions/IUserGateway";
import { IHashService } from '../abstractions/IHashService';

export class RegisterHandler {
    async Handle(request: IRegisterRequest): Promise<void> {
        const userId = this.idGenerator.Generate()
        const password = this.passwordHasher.Hash(request.password)
        const user = {
            id: userId,
            username: request.username,
            email: request.email,
            password: password
        }
        await this.userGateway.Register(user)
        this.outputPort.UserRegistered(userId)
    }
    constructor(private readonly userGateway: IUserGateway,
        private readonly outputPort: IRegisterOutputPort,
        private readonly idGenerator: IIdGenerator,
        private readonly passwordHasher: IHashService){}
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterOutputPort {
    UserRegistered(userId: string): void;

}