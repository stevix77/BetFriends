import { IIdGenerator } from "../../../src/domain/abstractions/IIdGenerator";

export class StubIdGenerator implements IIdGenerator {
    constructor(private id: string){}
    Generate(): string {
        return this.id;
    }
}