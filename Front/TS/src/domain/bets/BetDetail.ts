export interface BetDetail {
    BetId: string;
    Description: string;
    EndDate: Date;
    Chips: number;
    OwnerId: string;
    OwnerName: string;
    Members: BetMember[];
}

export interface BetMember {
    Id: string;
    Name: string;
}