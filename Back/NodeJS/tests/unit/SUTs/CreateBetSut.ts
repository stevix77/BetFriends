import { expect } from "vitest";
import { CreateBetCommand, CreateBetCommandHandler, CreateBetResponse } from "../../../src/application/features/create-bet/CreateBetHandler";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { MockCreateBetPresenter } from "../implems/MockCreateBetPresenter";
import { StubMemberRepository } from "../implems/StubMemberRepository";
import { Member } from "../../../src/domain/members/Member";
import { MemberId } from "../../../src/domain/members/MemberId";
import { StubUserContext } from "../implems/StubUserContext";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";

export class CreateBetSut {   
    
    private userId: string = "memberId"
    private command: CreateBetCommand;
    private betRepository = new InMemoryBetRepository();
    private mockPresenter = new MockCreateBetPresenter();
    private memberRepository = new StubMemberRepository(new Member(new MemberId(this.userId), 1000, 2));
    private userContext = new StubUserContext(this.userId);
    private dateTimeProvider = new StubDateTimeProvider(new Date(2024, 3, 3));

    GivenCommand(command: CreateBetCommand): CreateBetSut {
        this.command = command;
        return this;
    }

    GivenEmptyMemberRepository(): CreateBetSut {
        this.memberRepository = new StubMemberRepository(undefined)
        return this;
    }

    GivenRequester(member: Member): CreateBetSut {
        this.memberRepository = new StubMemberRepository(member)
        return this;
    }
    async WhenExecuteHandler(): Promise<CreateBetSut> {
        const handler = new CreateBetCommandHandler(this.betRepository, 
                                                    this.mockPresenter, 
                                                    this.memberRepository,
                                                    this.userContext,
                                                    this.dateTimeProvider);
        await handler.Handle(this.command)
        return this;
    }
    
    ShouldCreateBet() {
        expect(this.mockPresenter.Response).toEqual(new CreateBetResponse(this.command.BetId))
        expect(this.betRepository.Bets[0].Chips).toEqual(this.command.Chips)
        expect(this.betRepository.Bets[0].Description).toEqual(this.command.Description)
        expect(this.betRepository.Bets[0].EndDate).toEqual(this.command.EndDate)
        expect(this.betRepository.Bets[0].Members).toEqual(this.command.Members)
        expect(this.betRepository.Bets[0].BetId.Value).toEqual(this.command.BetId)
    }
    
    ShouldNotCreateBet() {
        expect(this.mockPresenter.Response).toBeUndefined()
        expect(this.betRepository.Bets).toEqual([])
    }
}