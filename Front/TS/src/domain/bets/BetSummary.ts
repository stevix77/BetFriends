export interface BetSummary {
    Id: string;
    Description: string;
    Coins: number;
    EndDate: Date;
    MaxAnswerDate: Date;
    BookieId: string;
    BookieName: string;
    Gamblers: Gambler[];
}

export interface Gambler {
    Id: string;
    Name: string;
    HasAccepted?: boolean
}