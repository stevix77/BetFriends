import { ICommand } from "../../../../../shared/application/Request/ICommand";

export class RegisterCommand extends ICommand {
    constructor(public readonly UserId: string,
                public readonly Username: string, 
                public readonly Email: string, 
                public readonly Password: string) {
                    super();
                }
    Name: string = RegisterCommand.name;
}