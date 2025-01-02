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
import { UserModule as UserApplicationModule } from "../../../../modules/users/src/infrastructure/UserModule";
import { LoggingBehavior } from "../../../../modules/shared/infrastructure/behaviors/LoggingBehavior";
import { UnitOfWorkBehavior } from "../../../../modules/shared/infrastructure/behaviors/UnitOfWorkBehavior";
import { InMemoryUnitOfWork } from "../../../../modules/shared/infrastructure/uow/InMemoryUnitOfWork";
import { DomainEventDispatcher } from "../../../../modules/bets/src/infrastructure/events/DomainEventDispatcher";
import { DomainEventAccessor } from "../../../../modules/shared/infrastructure/events/DomainEventAccessor";
import { InMemoryOutboxAccessor } from "../../../../modules/users/src/infrastructure/outbox/InMemoryOutboxAccessor";
import { DateTimeProvider } from "src/DateTimeProvider";
import { IEventBus } from "../../../../modules/shared/infrastructure/events/IEventBus";
import { RequestBehavior } from "../../../../modules/shared/infrastructure/behaviors/RequestBehavior";
import { Mediator } from "../../../../modules/shared/infrastructure/Mediator";
import { IDateTimeProvider } from "../../../../modules/shared/domain/IDateTimeProvider";
import { TokenGenerator } from "src/TokenGenerator";
import { JwtModule } from "@nestjs/jwt";
import { randomUUID } from "crypto";
const domainEventAccessor = new DomainEventAccessor();
const userRepository = new FakeUserRepository(domainEventAccessor)
const registerPresenter = new RegisterPresenter();
const outboxAccessor = new InMemoryOutboxAccessor();
const passwordHasher = new FakeHashPassword();

@Module({
    controllers: [SignInController, RegisterController],
    imports: [forwardRef(() => AppModule), JwtModule.register({
        global: true,
        secret: randomUUID(),
        signOptions: { expiresIn: '3600s' },
      })],
    providers: [
        {
            provide: DomainEventDispatcher,
            useFactory: (eventBus: IEventBus, 
                        dateTimeProvider: IDateTimeProvider) => 
                new DomainEventDispatcher(domainEventAccessor, 
                                        outboxAccessor,
                                        dateTimeProvider,
                                        eventBus),
            inject: ['IEventBus', 'IDateTimeProvider']
        },
        {
            provide: TokenGenerator,
            useClass: TokenGenerator
        },
        {
            provide: RegisterPresenter,
            useValue: registerPresenter
        },
        {
            provide: 'IUserModule',
            useFactory: (domainEventDispatcher: DomainEventDispatcher,
                            tokenGenerator: TokenGenerator
            ) => {
                const authenticationGateway = new FakeAuthenticationGateway(userRepository, tokenGenerator)
                const signinHandler = new SignInHandler(authenticationGateway, passwordHasher);
                const registerHandler = new RegisterHandler(registerPresenter, userRepository, passwordHasher);
                const mediator = new Mediator([signinHandler, registerHandler], [])
                const unitOfWorkBehavior = new UnitOfWorkBehavior(new InMemoryUnitOfWork(), domainEventDispatcher)
                const requestBehavior = new RequestBehavior(mediator)
                const loggingBehavior = new LoggingBehavior();
                loggingBehavior.SetNext(unitOfWorkBehavior).SetNext(requestBehavior)
                return new UserApplicationModule(loggingBehavior);
            },
            inject: [DomainEventDispatcher, TokenGenerator]
        }
    ]
})
export class UserModule {}