import { forwardRef, Module } from "@nestjs/common";
import { SignInController } from "./features/signIn.controller";
import { AppModule } from "src/app.module";
import { RegisterController } from "./features/register/register.controller";
import { RegisterPresenter } from "./features/register/registerPresenter";
import { IDateTimeProvider } from "../../../../modules/shared/domain/IDateTimeProvider";
import { TokenGenerator } from "src/TokenGenerator";
import { JwtModule } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { IEventBus } from "../../../../modules/shared/infrastructure/events/IEventBus";
import { UserProcessOutboxJobs } from './jobs/userProcessOutboxJobs';
import { UserModuleFactory } from '../../../../modules/users/src/infrastructure/UserModuleFactory';

@Module({
    controllers: [SignInController, RegisterController],
    imports: [forwardRef(() => AppModule), JwtModule.register({
        global: true,
        secret: randomUUID(),
        signOptions: { expiresIn: '3600s' },
      })
    ],
    exports: ['IUserModule'],
    providers: [
        UserProcessOutboxJobs,
        {
            provide: TokenGenerator,
            useClass: TokenGenerator
        },
        {
            provide: RegisterPresenter,
            useFactory: () => new RegisterPresenter()
        },
        {
            provide: 'IUserModule',
            useFactory: (dateTimeProvider: IDateTimeProvider,
                            tokenGenerator: TokenGenerator,
                            registerPresenter: RegisterPresenter,
                            eventBus: IEventBus
            ) => {
                return UserModuleFactory.Create(tokenGenerator,
                                                registerPresenter,
                                                dateTimeProvider,
                                                eventBus)
            },
            inject: ['IDateTimeProvider', 
                    TokenGenerator, 
                    RegisterPresenter,
                    'IEventBus']
        }
    ]
})
export class UserModule {}