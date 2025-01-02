import { ICommand } from "../../../../../shared/application/Request/ICommand";

export class RegisterCommand implements ICommand {
    constructor(public readonly UserId: string,
                public readonly Username: string, 
                public readonly Email: string, 
                public readonly Password: string) {}
    Name: string = RegisterCommand.name;
}