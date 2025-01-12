import { ITokenGenerator } from "../../../src/application/abstractions/ITokenGenerator";

export class StubTokenGenerator implements ITokenGenerator {
    Generate(userId: string): string {
        return "refreshtoken"
    }

}