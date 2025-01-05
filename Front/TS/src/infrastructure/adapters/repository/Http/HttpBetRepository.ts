import { Bet } from "../../../../domain/bets/Bet";
import { BetSummary } from "../../../../domain/bets/BetSummary";
import { IBetRepository } from "../../../../domain/bets/IBetRepository";
import { IHttpService } from "../../http/IHttpService";

export class HttpBetRepository implements IBetRepository {
    constructor(private readonly httpService: IHttpService) {}
    GetProofAsync(BetId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    async CompleteAsync(betId: string, isSuccess: boolean, proof?: string): Promise<void> {
        const data = {isSuccess, proof};
        const response = await this.httpService.Post(`bets/${betId}/complete`, data)
        if(response.Code == 200) {
            return Promise.resolve();
        }
        return Promise.reject(response.Error);
    }
    async AnswerAsync(betId: string, answer: boolean): Promise<void> {
        const data = {answer};
        const response = await this.httpService.Post(`bets/${betId}/answer`, data)
        if(response.Code == 200) {
            return Promise.resolve();
        }
        return Promise.reject(response.Error);
    }

    async GetAllAsync(): Promise<BetSummary[]> {
        const response = await this.httpService.Get(`bets`)
        if(response.Code == 200) {
            return Promise.resolve(JSON.parse(response.Data!) as BetSummary[]);
        }
        return Promise.reject(response.Error);
    }
    async Save(bet: Bet): Promise<void> {
        const data = {
            description: bet.Description,
            coins: bet.Coins, 
            endDate: bet.EndDate, 
            friends: bet.Friends
        }
        const response = await this.httpService.Post(`bets`, data)
        if(response.Code == 201) {
            return Promise.resolve();
        }
        return Promise.reject(response.Error);
    }
    
}