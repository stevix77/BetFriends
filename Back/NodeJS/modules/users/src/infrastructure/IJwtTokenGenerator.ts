export interface IJwtTokenGenerator {
    Generate(userData: UserData): string;
}

export interface UserData {
    UserId: string;
    Email: string;
    Username: string;
}