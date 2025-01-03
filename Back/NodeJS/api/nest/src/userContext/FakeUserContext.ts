import { UnauthorizedException, Injectable } from "@nestjs/common";
import { IUserContext } from "../../../../modules/bets/src/application/Abstractions/IUserContext";

@Injectable()
export class FakeUserContext implements IUserContext {
    headers: any;
    SetRequest(headers: Record<import("fastify/types/utils").HttpHeader, string | number | string[]>) {
        this.headers = headers
    }
    
    constructor() {}
    GetUserId(): string {
        if(!this.headers.userid == undefined) throw new UnauthorizedException();
        const userId = this.headers.userid as string
        return userId;
    }
}