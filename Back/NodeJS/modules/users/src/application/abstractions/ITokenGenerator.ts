import { User } from "../../domain/users/User";

export interface ITokenGenerator {
    Generate(user: User): string;
}