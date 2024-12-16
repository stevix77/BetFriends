import { IHashPassword } from "../application/abstractions/IHashPassword"

export class FakeHashPassword implements IHashPassword {
    Hash(password: string): string {
        return `hashed${password}`
    }

}