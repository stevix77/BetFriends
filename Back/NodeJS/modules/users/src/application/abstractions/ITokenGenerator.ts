export interface ITokenGenerator {
    Generate(userId: string): string;
}