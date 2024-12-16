export interface IHashPassword {
    Hash(password: string): string;
}