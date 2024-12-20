import { IHashService } from "../../../src/domain/abstractions/IHashService";

export class StubPasswordHasher implements IHashService {
    constructor(private hashkey: string){}
    Hash(password: string): string {
        return `${this.hashkey}${password}`
    }
}