import { IAuthenticationGateway } from "../application/abstractions/IAuthenticationGateway"
import { Authenticate } from "../application/features/sign-in/signInHandler";

export class FakeAuthenticationGateway implements IAuthenticationGateway {
    Authenticate(email: string, password: string): Promise<Authenticate> {
        if(email == "email@email.fr" && password == "hashedpassword") {
            return Promise.resolve({
                AccessToken: "accesstoken",
                RefreshToken: "refreshtoken"
            });
        }
        return Promise.resolve(undefined!);
    }

}