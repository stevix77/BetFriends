import { ICommand } from "@nestjs/cqrs";

export class RegisterCommand implements ICommand {
    constructor(public readonly UserId: string,
                public readonly Username: string, 
                public readonly Email: string, 
                public readonly Password: string) {}
}