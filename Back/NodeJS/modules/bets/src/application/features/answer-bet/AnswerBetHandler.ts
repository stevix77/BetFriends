import { IAnswerBetRepository } from "../../../domain/answerBets/IAnswerBetRepository";
import { Bet } from "../../../domain/bets/Bet";
import { BetId } from "../../../domain/bets/BetId";
import { ICommand } from "../../../../../shared/application/Request/ICommand"
import { IBetRepository } from "../../../domain/bets/IBetRepository";
import { IMemberRepository } from "../../../domain/members/IMemberRepository";
import { Member } from "../../../domain/members/Member";
import { MemberId } from "../../../domain/members/MemberId";
import { IUserContext } from "../../Abstractions/IUserContext";
import { IRequestHandler } from "../../../../../shared/application/Request/IRequestHandler"
import { IDateTimeProvider } from "../../../../../shared/domain/IDateTimeProvider";

export class AnswerBetCommandHandler implements IRequestHandler<AnswerBetCommand, void> {
    constructor(private readonly betRepository: IBetRepository,
                private readonly answerOutputPort: IAnswerBetOutputPort,
                private readonly answerBetRepository: IAnswerBetRepository,
                private readonly userContext: IUserContext,
                private readonly memberRepository: IMemberRepository,
                private readonly dateTimeProvider: IDateTimeProvider
    ) {}
    GetRequestType(): string {
        return AnswerBetCommand.name;
    }

    async Handle(request: AnswerBetCommand): Promise<void> {
        const bet = await this.betRepository.GetById(new BetId(request.BetId))
        if(!bet) {
            this.answerOutputPort.BetDoesNotExist(request.BetId);
            return;
        }

        if(this.IsUserIsBettor(bet.BettorId.Value)) {
            this.answerOutputPort.UserCannotAnswerToOwnBet();
            return;
        }

        if(this.CannotAnswerAnymore(bet)) {
            this.answerOutputPort.DateToAnswerIsOver();
            return;
        }

        const member = await this.memberRepository.GetByIdAsync(
            new MemberId(this.userContext.GetUserId())
        );
        if(!member) {
            this.answerOutputPort.MemberDoesNotExisting()
            return;
        }

        if(this.IsMemberHasNotEnoughCoins(member, bet)) {
            this.answerOutputPort.MemberHasNotEnoughCoins();
            return;
        }

        if(this.IsUserCannotAnswer(bet.Members)) {
            this.answerOutputPort.UserCannotAnswerOnThisBet();
            return;
        }

        if(request.Answer) {
            this.AcceptBet(request.BetId, member)
            return;
        }
        this.RejectBet(request.BetId, member);
    }
    
    private CannotAnswerAnymore(bet: Bet) {
        return this.dateTimeProvider.GetDate() > bet.MaxAnswerDate
    }

    private async AcceptBet(betId: string, member: Member): Promise<void> {
        const answerBet = member.AcceptBet(new BetId(betId))
        await this.answerBetRepository.Save(answerBet);
        this.answerOutputPort.Present({
            BetId: betId,
            Answer: true
        })
    }

    private async RejectBet(betId: string, member: Member): Promise<void> {
        const answerBet = member.RejectBet(new BetId(betId))
        await this.answerBetRepository.Save(answerBet);
        this.answerOutputPort.Present({
            BetId: betId,
            Answer: false
        })
    }

    private IsMemberHasNotEnoughCoins(member: Member, bet: Bet) {
        return !member.CanBet(bet)
    }

    private IsUserIsBettor(userId: string): boolean {
        return userId == this.userContext.GetUserId();
    }

    private IsUserCannotAnswer(members: string[]): boolean {
        return !members.some(x => x == this.userContext.GetUserId())
    }
}

export class AnswerBetCommand extends ICommand {
    constructor(public readonly BetId: string, public readonly Answer: boolean){
        super()
    }
    Name: string = AnswerBetCommand.name;
}

export interface IAnswerBetOutputPort {
    DateToAnswerIsOver(): void;
    MemberHasNotEnoughCoins(): void;
    MemberDoesNotExisting(): void;
    UserCannotAnswerOnThisBet(): void;
    BetDoesNotExist(BetId: string): void;
    UserCannotAnswerToOwnBet(): void;
    Present(Response: AnswerResponse): void;
}

export interface AnswerResponse {
    BetId: string;
    Answer: boolean
}