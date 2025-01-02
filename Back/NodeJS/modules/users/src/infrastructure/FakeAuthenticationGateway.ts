import { IAuthenticationGateway } from "../application/abstractions/IAuthenticationGateway"
import { Authenticate } from "../application/features/sign-in/signInHandler";
import { FakeUserRepository } from "./repositories/FakeUserRepository";
import { ITokenGenerator } from "../application/abstractions/ITokenGenerator";

export class FakeAuthenticationGateway implements IAuthenticationGateway {
    constructor(private readonly userRepository: FakeUserRepository,
                private readonly tokenGenerator: ITokenGenerator
    ) {}
    Authenticate(email: string, password: string): Promise<Authenticate> {
        const user = this.userRepository.GetUsers().find(user => {
            const snapshot = user.GetSnapshot();
            return snapshot.Email == email && snapshot.Password == password;
        });
        if(user) {
            return Promise.resolve({
                AccessToken: this.tokenGenerator.Generate(user),
                RefreshToken: "refreshtoken"
            });
        }
        return Promise.resolve(undefined!);
    }

}