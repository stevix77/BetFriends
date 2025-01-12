import { RegisterCommand } from "./RegisterCommand";
import { IHashPassword } from "../../abstractions/IHashPassword";
import { IUserRepository } from "../../../domain/users/IUserRepository";
import { User } from "../../../domain/users/User";
import { UserId } from "../../../domain/users/UserId";
import { IRequestHandler } from "../../../../../Shared/Application/Request/IRequestHandler";
import { ITokenGenerator } from "../../abstractions/ITokenGenerator";

export class RegisterHandler implements IRequestHandler<RegisterCommand, void> {
    constructor(private readonly outputPort: IRegisterOutputPort,
                private readonly userRepository: IUserRepository,
                private readonly passwordHasher: IHashPassword,
                private readonly tokenGenerator: ITokenGenerator
    ) {}
    async Handle(request: RegisterCommand): Promise<void> {
        const isUserExists = await this.userRepository.IsExists(request.Email,
            request.UserId,
            request.Username
        );
        if(isUserExists) {
            this.outputPort.UserAlreadyExists()
            return;
        }
        const password = this.passwordHasher.Hash(request.Password);
        const user = User.Create(new UserId(request.UserId), 
                            request.Username, 
                            request.Email, 
                            password,
                            this.tokenGenerator.Generate(request.UserId))
        await this.userRepository.Save(user)
        this.outputPort.Present();
    }

    GetRequestType(): string {
        return RegisterCommand.name;
    }
}
export interface IRegisterOutputPort {
    UserAlreadyExists(): void;
    Present(): void;

}

