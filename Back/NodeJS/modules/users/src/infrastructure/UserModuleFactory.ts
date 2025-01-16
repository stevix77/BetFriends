import { DomainEventAccessor } from '../../../shared/infrastructure/events/DomainEventAccessor';
import { FakeUserRepository } from './repositories/FakeUserRepository';
import { FakeHashPassword } from './FakeHashPassword';
import { InMemoryOutboxAccessor } from '../../../users/src/infrastructure/outbox/InMemoryOutboxAccessor';
import { FakeAuthenticationGateway } from './FakeAuthenticationGateway';
import { ITokenGenerator } from '../application/abstractions/ITokenGenerator';
import { SignInHandler } from '../application/features/sign-in/SignInHandler';
import { IRegisterOutputPort, RegisterHandler } from '../application/features/register/RegisterHandler';
import { Mediator } from '../../../shared/infrastructure/Mediator';
import { UnitOfWorkBehavior } from '../../../shared/infrastructure/behaviors/UnitOfWorkBehavior';
import { InMemoryUnitOfWork } from '../../../shared/infrastructure/uow/InMemoryUnitOfWork';
import { RequestBehavior } from '../../../shared/infrastructure/behaviors/RequestBehavior';
import { LoggingBehavior } from '../../../shared/infrastructure/behaviors/LoggingBehavior';
import { DomainEventDispatcher } from './events/DomainEventDispatcher';
import { IDateTimeProvider } from '../../../shared/domain/IDateTimeProvider';
import { DomainEventNotificationFactory } from './events/DomainEventNotificationFactory';
import { ProcessOutboxCommandHandler } from './outbox/ProcessOutboxCommand';
import { IntegrationEventFactory } from './integrationEvents/IntegrationEventFactory';
import { IEventBus } from '../../../shared/infrastructure/events/IEventBus';
import { IUserModule } from '../application/abstractions/IUserModule';
import { UserModule } from './UserModule';
import { IJwtTokenGenerator } from './IJwtTokenGenerator';
export class UserModuleFactory {
    static Create(tokenGenerator: ITokenGenerator,
        registerPresenter: IRegisterOutputPort,
        dateProvider: IDateTimeProvider,
        eventBus: IEventBus,
        jwtTokenGenerator: IJwtTokenGenerator): IUserModule {
        const domainEventAccessor = new DomainEventAccessor();
        const userRepository = new FakeUserRepository(domainEventAccessor)
        const outboxAccessor = new InMemoryOutboxAccessor();
        const passwordHasher = new FakeHashPassword();
        const authenticationGateway = new FakeAuthenticationGateway(userRepository, jwtTokenGenerator)
        const signinHandler = new SignInHandler(authenticationGateway, passwordHasher);
        const registerHandler = new RegisterHandler(registerPresenter, userRepository, passwordHasher, tokenGenerator);
        const processOutboxHandler = new ProcessOutboxCommandHandler(outboxAccessor, 
                                                                    dateProvider, 
                                                                    new IntegrationEventFactory(), 
                                                                    eventBus);
        const mediator = new Mediator([signinHandler, 
                                        registerHandler,
                                        processOutboxHandler], [])
        const domainEventDispatcher = new DomainEventDispatcher(domainEventAccessor, 
                                                                outboxAccessor,
                                                                dateProvider, 
                                                                new DomainEventNotificationFactory(), 
                                                                [])
        const unitOfWorkBehavior = new UnitOfWorkBehavior(new InMemoryUnitOfWork(), domainEventDispatcher)
        const requestBehavior = new RequestBehavior(mediator)
        const loggingBehavior = new LoggingBehavior();
        loggingBehavior.SetNext(unitOfWorkBehavior).SetNext(requestBehavior)
        return new UserModule(loggingBehavior)
    }
}