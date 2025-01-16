import { Authenticate } from "../features/sign-in/SignInHandler";

export interface IAuthenticationGateway {
    Authenticate(Email: string, password: string): Promise<Authenticate>;
    
}