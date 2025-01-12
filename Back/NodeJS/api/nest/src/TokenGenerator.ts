import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { IJwtTokenGenerator, UserData } from "../../../modules/users/src/infrastructure/IJwtTokenGenerator";

@Injectable()
export class TokenGenerator implements IJwtTokenGenerator {
    constructor(private readonly jwtService: JwtService) {}
    Generate(userData: UserData): string {
        return this.jwtService.sign({sub: userData.UserId, username: userData.Username, email: userData.Email })
    }

}