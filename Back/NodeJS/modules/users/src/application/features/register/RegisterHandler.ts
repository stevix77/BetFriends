import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCommand } from "./RegisterCommand";
import { IHashPassword } from "../../abstractions/IHashPassword";
import { IUserRepository } from "../../../domain/users/IUserRepository";
import { User } from "../../../domain/users/User";
import { UserId } from "../../../domain/users/UserId";

export class RegisterHandler implements ICommandHandler<RegisterCommand, void> {
    constructor(private outputPort: IRegisterOutputPort,
                private userRepository: IUserRepository,
                private passwordHasher: IHashPassword
    ) {}
    async execute(command: RegisterCommand): Promise<any> {
        const user = await this.userRepository.IsExists(command.Email,
                                                        command.UserId,
                                                        command.Username
        );
        if(user) {
            this.outputPort.UserAlreadyExists()
            return;
        }
        await this.userRepository.Save(User.Create(new UserId(command.UserId), 
                                            command.Username, 
                                            command.Email, 
                                            this.passwordHasher.Hash(command.Password)))
        this.outputPort.Present()
        return Promise.resolve()
    }

}
export interface IRegisterOutputPort {
    UserAlreadyExists(): void;
    Present(): void;

}

