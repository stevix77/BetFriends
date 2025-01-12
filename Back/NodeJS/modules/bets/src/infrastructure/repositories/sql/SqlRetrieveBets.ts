import { GamblerDto, IRetrieveBetsDataAccess, RetrieveBetsResponse } from "../../../application/features/retrieve-bets/RetrieveBetsQueryHandler";
import sql, { ConnectionPool } from "mssql";

export class SqlRetrieveBets implements IRetrieveBetsDataAccess {
    constructor(private readonly pool: ConnectionPool){
        
    }
    
    
    async RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]> {
        const req = await this.pool.request()
                                    .input('userId', sql.VarChar(50), userId)
                                    .query(`SELECT b.bet_id Id, 
                                        b.description Description, 
                                        b.coins Coins, 
                                        b.end_date EndDate, 
                                        b.max_answer_date MaxAnswerDate,
                                        b.bettor_id BettorId,
                                        m.username BettorName,
                                        a.gambler_id GamblerId,
                                        mm.username GamblerName,
                                        a.answer Answer
                                        FROM bet.bets b 
                                        INNER JOIN bet.members m ON b.bettor_id = m.member_id
                                        LEFT JOIN bet.answers a = a.bet_id = b.bet_id
                                        INNER JOIN bet.members mm = mm.member_id = a.gambler_id
                                            WHERE b.bettor_id = '@userId'
                                            OR a.gambler_id = '@userId'
                                            ORDER BY b.max_answer_date, b.bet_id`);
        
        const bets: RetrieveBetsResponse[] = [];
        let betId: string = '';
        let bettorId: string = '';
        let bettorName: string = '';
        let description: string = '';
        let endDate: Date = new Date();
        let maxAnswerDate: Date = new Date();
        let coins: number = 0;
        let gamblers: GamblerDto[] = [];
        for(const record of req.recordset) {
            if(betId != '' && betId != record["Id"]) {
                bets.push({
                    BookieId: bettorId,
                    BookieName: bettorName,
                    Description: description,
                    EndDate: endDate,
                    MaxAnswerDate: maxAnswerDate,
                    Coins: coins,
                    Id: betId,
                    Gamblers: gamblers
                })
                gamblers = [];
            }
            betId = record["Id"];
            bettorId = record["BettorId"];
            bettorName = record["BettorName"];
            coins = record["Coins"];
            description = record["Description"];
            endDate = record["EndDate"];
            maxAnswerDate = record["MaxAnswerDate"];
            gamblers.push({
                Id: record["GamblerId"],
                Name: record["GamblerName"],
                HasAccepted: record["Answer"]
            })
        }
        return bets;
    }

}