import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RegisterCommand } from "./RegisterCommand";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, void> {
    execute(command: RegisterCommand): Promise<any> {
        return Promise.resolve();
    }

}