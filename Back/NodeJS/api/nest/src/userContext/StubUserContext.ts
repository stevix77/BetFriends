import { IUserContext } from "../../../../modules/bets/src/application/Abstractions/IUserContext";

export class StubUserContext implements IUserContext {
    GetUserId(): string {
        return "adadadad-1111-6666-4444-edededededed";
    }

}