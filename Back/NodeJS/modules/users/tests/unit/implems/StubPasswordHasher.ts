import { IHashPassword } from "../../../src/application/abstractions/IHashPassword";

export class StubPasswordHasher implements IHashPassword {
    constructor(private hashedPassword: string) {}
    Hash(password: string): string {
        return this.hashedPassword
    }
}