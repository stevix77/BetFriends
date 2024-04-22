import { ICreateBetOutputPort, CreateBetResponse } from "../../../src/application/features/CreateBetHandler";

export class MockCreateBetPresenter implements ICreateBetOutputPort {
    
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