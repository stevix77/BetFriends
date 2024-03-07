import { Injectable } from "@nestjs/common";
import { IUserContext } from "../../../../application/Abstractions/IUserContext";

@Injectable()
export class FakeUserContext implements IUserContext {
    UserId: string = "adadadad-1111-6666-4444-edededededed";

}