import type { IUserContext } from "../../../../../domain/abstractions/IUserContext";

export class UserContext implements IUserContext {

    private userId: string = ""
    public get UserId(): string {
        return this.userId;
    }

    public set UserId(userId: string) {
        this.userId = userId;
    }
    

}