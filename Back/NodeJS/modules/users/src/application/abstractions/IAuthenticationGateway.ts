import { Authenticate } from "../features/sign-in/signInHandler";

export interface IAuthenticationGateway {
    Authenticate(Email: string, password: string): Promise<Authenticate>;
    
}