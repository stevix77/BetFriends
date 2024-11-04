import { IUserContext } from "../../../../../../domain/abstractions/IUserContext";

export class UserContext implements IUserContext {

    constructor(private readonly userId: string){}
    public get UserId(): string {
        return this.userId;
    }
    

}