export interface BetDetail {
    BetId: string;
    Description: string;
    EndDate: Date;
    Coins: number;
    OwnerId: string;
    OwnerName: string;
    Members: BetMember[];
}

export interface BetMember {
    Id: string;
    Name: string;
}