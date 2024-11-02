export class Bet {
    constructor(public Id: string, 
        public Description: string, 
        public EndDate: Date, 
        public Coins: number, 
        public Friends: string[]){}
}