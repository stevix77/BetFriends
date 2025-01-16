import { IAuthenticationGateway } from "../application/abstractions/IAuthenticationGateway"
import { Authenticate } from "../application/features/sign-in/SignInHandler";
import { FakeUserRepository } from "./repositories/FakeUserRepository";
import { IJwtTokenGenerator } from "./IJwtTokenGenerator";

export class FakeAuthenticationGateway implements IAuthenticationGateway {
    constructor(private readonly userRepository: FakeUserRepository,
                private readonly jwtTokenGenerator: IJwtTokenGenerator
    ) {}
    Authenticate(email: string, password: string): Promise<Authenticate> {
        const user = this.userRepository.GetUsers().find(u => {
            const snapshot = u.GetSnapshot();
            return snapshot.Email == email && snapshot.Password == password;
        });
        if(user) {
            const userSnapshot = user.GetSnapshot();
            return Promise.resolve({
                AccessToken: this.jwtTokenGenerator.Generate({
                    Email: userSnapshot.Email,
                    Username: userSnapshot.Username,
                    UserId: userSnapshot.UserId
                }),
                RefreshToken: userSnapshot.RefreshToken
            });
        }
        return Promise.resolve(undefined!);
    }

}