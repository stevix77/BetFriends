import { IUserContext } from "../../../src/domain/abstractions/IUserContext";

export class FakeUserContext implements IUserContext {
    constructor(private readonly userId: string) {}
    
    public get UserId() : string {
        return this.userId;
    }
    
}