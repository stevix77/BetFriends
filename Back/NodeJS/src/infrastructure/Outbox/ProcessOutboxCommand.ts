import { ICommand } from "../../application/Abstractions/Request/ICommand"
import { IRequestHandler } from "../../application/Abstractions/Request/IRequestHandler";
import { IDateTimeProvider } from "../../domain/IDateTimeProvider";
import { IOutboxRepository } from "./IOutboxRepository";

export class ProcessOutboxCommand implements ICommand {
    Name: string = ProcessOutboxCommand.name;
}

export class ProcessOutboxCommandHandler implements IRequestHandler<ProcessOutboxCommand, void> {
    constructor(private readonly outboxRepository: IOutboxRepository,
                private readonly dateProvider: IDateTimeProvider
    ) {}

    async Handle(request: ProcessOutboxCommand): Promise<void> {
        const outboxes = await this.outboxRepository.GetAll();
        for(let item of outboxes) {
            item.Handled(this.dateProvider);
            await this.outboxRepository.Save(item);
        }
    }
    GetRequestType(): string {
        return ProcessOutboxCommand.name
    }

}