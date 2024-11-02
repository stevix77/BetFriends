export interface BetSummary {
    Id: string;
    Description: string;
    Coins: number;
    EndDate: Date;
    BookieId: string;
    OwnerName: string;
    Gamblers: Gambler[];
}

export interface Gambler {
    Id: string;
    Name: string;
    HasAccepted?: boolean
}