import { forwardRef, Module } from "@nestjs/common";
import { SignInController } from "./features/signIn.controller";
import { AppModule } from "src/app.module";
import { SignInHandler } from "../../../../modules/users/src/application/features/sign-in/SignInHandler";
import { FakeAuthenticationGateway } from "../../../../modules/users/src/infrastructure/FakeAuthenticationGateway";
import { FakeHashPassword } from "../../../../modules/users/src/infrastructure/FakeHashPassword";
import { IAuthenticationGateway } from "../../../../modules/users/src/application/abstractions/IAuthenticationGateway";
import { IHashPassword } from "../../../../modules/users/src/application/abstractions/IHashPassword";
import { RegisterHandler } from "../../../../modules/users/src/application/features/register/RegisterHandler"
import { CqrsModule } from "@nestjs/cqrs";
const commandHandlers = [RegisterHandler]
@Module({
    controllers: [SignInController],
    imports: [forwardRef(() => AppModule), CqrsModule],
    providers: [
        ...commandHandlers,
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
        }
    ]
})
export class UserModule {}