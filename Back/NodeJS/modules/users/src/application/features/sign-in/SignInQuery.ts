import { IQuery } from "@nestjs/cqrs";

export class SignInRequest implements IQuery {
    constructor(public readonly Email: string, public readonly  Password: string){}
    
}