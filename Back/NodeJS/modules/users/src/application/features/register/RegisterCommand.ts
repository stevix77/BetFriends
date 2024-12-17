import { ICommand } from "@nestjs/cqrs";

export class RegisterCommand implements ICommand {
    constructor(public readonly Email: string) {}
}