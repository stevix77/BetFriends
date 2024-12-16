import { IUserContext } from "../../../src/application/Abstractions/IUserContext";

export class StubUserContext implements IUserContext {
    constructor(public UserId: string){}
    GetUserId(): string {
        return this.UserId
    }
}