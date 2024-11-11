import { expect } from "vitest";
import { AnswerBetCommand, AnswerBetCommandHandler } from "../../../src/application/features/answer-bet/AnswerBetHandler";
import { Bet } from "../../../src/domain/bets/Bet";
import { BetId } from "../../../src/domain/bets/BetId";
import { MemberId } from "../../../src/domain/members/MemberId";
import { InMemoryBetAnswerRepository } from "../../../src/infrastructure/repositories/InMemoryBetAnswerRepository";
import { InMemoryBetRepository } from "../../../src/infrastructure/repositories/InMemoryBetRepository";
import { MockAnswerBetPresenter } from "../implems/MockAnswerBetPresenter";
import { StubUserContext } from "../implems/StubUserContext";
import { AnswerBet } from "../../../src/domain/answerBets/AnswerBet";
import { Member } from "../../../src/domain/members/Member";
import { StubMemberRepository } from "../implems/StubMemberRepository";
import { StubDateTimeProvider } from "../implems/StubDateTimeProvider";

export class AnswerBetSut {
       
    constructor(private betId: string, private bettorId: string, private gamblerId: string){ 
        this.answerPresenter = new MockAnswerBetPresenter();
        this.answerBetRepository = new InMemoryBetAnswerRepository()
        this.userContext = new StubUserContext(this.gamblerId)
        this.dateTimeProvider = new StubDateTimeProvider(new Date('2024-10-10'))
    }
    private bet: Bet;
    private readonly answerPresenter: MockAnswerBetPresenter;
    private readonly answerBetRepository: InMemoryBetAnswerRepository;
    private readonly userContext: StubUserContext;
    private memberRepository: StubMemberRepository;
    private request: AnswerBetCommand;
    private member: Member;
    private dateTimeProvider: StubDateTimeProvider;
    
    WithExistingBet() {
        this.bet = Bet.Create(new BetId(this.betId),
                                new MemberId(this.bettorId),
                            "description", 100, 
                        new Date('2024-11-21'),
                    [this.gamblerId],
                    this.dateTimeProvider)
        return this;
    }

    WithCurrentDate(currentDate: Date): AnswerBetSut {
        this.dateTimeProvider = new StubDateTimeProvider(currentDate)
        return this;
    }

    WithExistingMember(coins: number): AnswerBetSut {
        this.member = new Member(new MemberId(this.gamblerId),
                                "username",
                            coins, 1);
        this.memberRepository = new StubMemberRepository(this.member)
        return this;
    }

    WithUser(userId: string): AnswerBetSut {
        this.userContext.UserId = userId;
        return this;
    }

    WithoutMember(): AnswerBetSut {
        this.memberRepository = new StubMemberRepository(undefined);
        return this;
    }
    
    async WhenExecuteHandler(request: AnswerBetCommand): Promise<AnswerBetSut> {
        this.request = request;
        const handler = new AnswerBetCommandHandler(
                new InMemoryBetRepository(this.bet != undefined ? [this.bet] : []), 
                this.answerPresenter, 
                this.answerBetRepository, 
                this.userContext,
                this.memberRepository,
                this.dateTimeProvider);
        await handler.Handle(request);
        return this;
    }

    ShouldSaveAnswer() {
        expect(this.answerBetRepository.Answers)
            .toContainEqual(new AnswerBet(new BetId(this.request.BetId),
                                        this.request.Answer,
                                new MemberId(this.userContext.UserId)))
        expect(this.answerPresenter.Response).toEqual({
            BetId: this.request.BetId,
            Answer: this.request.Answer
        })
    }

    ShouldNotSaveAnswer(errorMessage: string) {
        expect(this.answerBetRepository.Answers).toEqual([])
        expect(this.answerPresenter.Error).toBe(errorMessage)
    }
}