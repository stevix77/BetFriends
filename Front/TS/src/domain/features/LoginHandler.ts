import { IHashService } from "../abstractions/IHashService";

export class LoginHandler {
    constructor(private readonly authRepository: IAuthRepository,
                private readonly loginOutputPort: ILoginOutputPort,
                private readonly hasher: IHashService
    ) {}

    private HasError: boolean = false;
    async Handle(request: ILoginRequest): Promise<void> {
        
        this.ValidateRequest(request)
        if(this.HasError) {
            return Promise.resolve();
        }

        const password: string = this.hasher.Hash(request.password);
        const authToken = await this.authRepository.Login({
            email: request.email,
            password: password
        })
        if(authToken) {
            this.loginOutputPort.LoggedIn(authToken);
            return Promise.resolve();
        }
        this.loginOutputPort.IncorrectCredentials();
    }
    
    private ValidateRequest(request: ILoginRequest) {
        if(!request.email || request.email.length == 0) {
            this.HasError = true;
            this.loginOutputPort.LoginIsEmpty()
        }
        if(!request.password || request.password.length == 0) {
            this.HasError = true;
            this.loginOutputPort.PasswordEmpty()
        }
    }
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface AuthToken {
    AccessToken: string;
    RefreshToken: string;
}

export interface IAuthRepository {
    Login(credentials: { email: string; password: string; }): Promise<AuthToken>;
}

export interface ILoginOutputPort {
    LoggedIn(authToken: AuthToken): void;
    IncorrectCredentials(): void;
    PasswordEmpty(): void;
    LoginIsEmpty(): void;

}