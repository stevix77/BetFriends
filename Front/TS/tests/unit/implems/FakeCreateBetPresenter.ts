import { CreateBetResponse, ICreateBetOutputPort } from "../../../src/domain/features/CreateBetHandler";

export class FakeCreateBetPresenter implements ICreateBetOutputPort {
    FriendsIsEmpty(): void {
        this.Error = "Should bet with at least one friend"
    }
    DescriptionIsEmpty(): void {
        this.Error = "Description is empty"
    }
    InvalidEndDate(): void {
        this.Error = "Invalid end date"
    }
    Present(createBetResponse: CreateBetResponse) {
        this.Bet = createBetResponse;
    }

    InvalidChip(): void {
        this.Error = "Should bet with at least one chip";
    }
    Bet: CreateBetResponse;
    Error: string;

}