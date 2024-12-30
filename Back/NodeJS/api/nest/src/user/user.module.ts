import { forwardRef, Module } from "@nestjs/common";
import { SignInController } from "./features/signIn.controller";
import { AppModule } from "src/app.module";
import { SignInHandler } from "../../../../modules/users/src/application/features/sign-in/SignInHandler";
import { FakeAuthenticationGateway } from "../../../../modules/users/src/infrastructure/FakeAuthenticationGateway";
import { FakeUserRepository } from "../../../../modules/users/src/infrastructure/repositories/FakeUserRepository";
import { FakeHashPassword } from "../../../../modules/users/src/infrastructure/FakeHashPassword";
import { IAuthenticationGateway } from "../../../../modules/users/src/application/abstractions/IAuthenticationGateway";
import { IHashPassword } from "../../../../modules/users/src/application/abstractions/IHashPassword";
import { RegisterHandler } from "../../../../modules/users/src/application/features/register/RegisterHandler"
import { RegisterController } from "./features/register/register.controller";
import { RegisterPresenter } from "./features/register/registerPresenter";
const userRepository = new FakeUserRepository()
const registerPresenter = new RegisterPresenter()
@Module({
    controllers: [SignInController, RegisterController],
    imports: [forwardRef(() => AppModule)],
    providers: [
        {
            provide: 'IAuthenticationGateway',
            useClass: FakeAuthenticationGateway
        },
        {
            provide: 'IHashPassword',
            useClass: FakeHashPassword
        },
        {
            provide: SignInHandler,
            useFactory: (authenticationGateway: IAuthenticationGateway,
                        hashPassword: IHashPassword
            ) => new SignInHandler(authenticationGateway, hashPassword),
            inject: ['IAuthenticationGateway', 'IHashPassword']
        },
        {
            provide: RegisterPresenter,
            useValue: registerPresenter
        },
        {
            provide: RegisterHandler,
            useFactory: (hashPassword: IHashPassword) => 
                new RegisterHandler(registerPresenter, userRepository, hashPassword),
            inject: ['IHashPassword']
        }
    ]
})
export class UserModule {}