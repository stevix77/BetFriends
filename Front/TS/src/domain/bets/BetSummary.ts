export class BetSummary {
    constructor(public readonly Id: string,
        public readonly Description: string,
        public readonly Chips: number,
        public readonly EndDate: Date){}
}