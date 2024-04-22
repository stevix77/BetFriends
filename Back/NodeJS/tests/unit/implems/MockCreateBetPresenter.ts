import { CreateBetOutputPort, CreateBetResponse } from "../../../src/application/features/CreateBetHandler";

export class MockCreateBetPresenter implements CreateBetOutputPort {
    
    InvalidChips(): void {
        
    }
    EndDateIsTooOld(): void {
        
    }
    RequesterIsUnknown(): void {
        
    }
    
    Present(createBetResponse: CreateBetResponse) {
        this.Response = createBetResponse;
    }
    Response: CreateBetResponse
}