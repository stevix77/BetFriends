export class SignInViewModel {
    constructor() {}

    email?: string;
    password?: string;
    error?: string;

    Signin(): Promise<void> {
        return Promise.resolve();
    }
}