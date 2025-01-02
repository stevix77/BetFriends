import { Injectable } from "@nestjs/common";
import { ITokenGenerator } from "../../../modules/users/src/application/abstractions/ITokenGenerator";
import { User } from "../../../modules/users/src/domain/users/User";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
    constructor(private readonly jwtService: JwtService) {}
    Generate(user: User): string {
        const userSnapshot = user.GetSnapshot();
        return this.jwtService.sign({sub: userSnapshot.UserId, username: userSnapshot.Username })
    }

}