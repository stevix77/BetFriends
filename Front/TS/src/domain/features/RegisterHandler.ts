import { IIdGenerator } from "../abstractions/IIdGenerator";
import { IUserGateway } from "../abstractions/IUserGateway";
import { IHashService } from '../abstractions/IHashService';

export class RegisterHandler {

    constructor(private readonly userGateway: IUserGateway,
        private readonly outputPort: IRegisterOutputPort,
        private readonly idGenerator: IIdGenerator,
        private readonly passwordHasher: IHashService){}

        
    async Handle(request: IRegisterRequest): Promise<void> {
        if(request.confirmPassword.length == 0 ||
            request.username.length == 0 ||
            request.email.length == 0 ||
            request.password.length == 0) {
            this.outputPort.FieldIsEmpty()
            return;
        }

        if(request.confirmPassword != request.password) {
            this.outputPort.PasswordsAreDifferent()
            return;
        }
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
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IRegisterOutputPort {
    PasswordsAreDifferent(): void;
    FieldIsEmpty(): void;
    UserRegistered(userId: string): void;

}