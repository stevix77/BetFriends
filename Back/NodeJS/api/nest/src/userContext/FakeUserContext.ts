import { Inject, UnauthorizedException, Scope } from "@nestjs/common";
import { Request } from 'express';
import { REQUEST } from "@nestjs/core";
import { IUserContext } from "../../../../modules/bets/src/application/Abstractions/IUserContext";

export class FakeUserContext implements IUserContext {
    constructor(@Inject(REQUEST) private readonly context: Request) {}
    GetUserId(): string {
        if(!this.context.headers.userid == undefined) throw new UnauthorizedException();
        const userId = this.context.headers.userid as string
        return userId
    }
}