import { IUserContext } from "../../../../modules/bets/application/Abstractions/IUserContext";

export class StubUserContext implements IUserContext {
    GetUserId(): string {
        return "adadadad-1111-6666-4444-edededededed";
    }

}