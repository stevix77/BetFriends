import { AuthToken } from "../../domain/features/LoginHandler";

export interface IAuthenticateService {
    LoggedIn(authToken: AuthToken): void;
    IsLoggedIn(): boolean;
    LogOut(): void;
}