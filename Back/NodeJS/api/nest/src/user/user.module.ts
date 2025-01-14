import { forwardRef, Module } from "@nestjs/common";
import { SignInController } from "./features/signIn.controller";
import { AppModule } from "src/app.module";
import { RegisterController } from "./features/register/register.controller";
import { RegisterPresenter } from "./features/register/registerPresenter";
import { IDateTimeProvider } from "../../../../modules/shared/domain/IDateTimeProvider";
import { JwtTokenGenerator, TokenGenerator } from "src/TokenGenerator";
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
            provide: JwtTokenGenerator,
            useClass: JwtTokenGenerator
        },
        {
            provide: RegisterPresenter,
            useFactory: () => new RegisterPresenter()
        },
        {
            provide: 'IUserModule',
            useFactory: (dateTimeProvider: IDateTimeProvider,
                            registerPresenter: RegisterPresenter,
                            eventBus: IEventBus,
                            jwtTokenGenerator: JwtTokenGenerator
            ) => {
                return UserModuleFactory.Create(new TokenGenerator(),
                                                registerPresenter,
                                                dateTimeProvider,
                                                eventBus,
                                                jwtTokenGenerator)
            },
            inject: ['IDateTimeProvider', 
                    RegisterPresenter,
                    'IEventBus',
                    JwtTokenGenerator]
        }
    ]
})
export class UserModule {}