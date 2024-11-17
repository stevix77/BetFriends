export interface BetSummary {
    Id: string;
    Description: string;
    Coins: number;
    EndDate: Date;
    MaxAnswerDate: Date;
    BookieId: string;
    BookieName: string;
    Gamblers: Gambler[];
    IsSuccess?: boolean;
}

export interface Gambler {
    Id: string;
    Name: string;
    HasAccepted?: boolean
}