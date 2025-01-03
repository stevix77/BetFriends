export class MemberSnapshot {
    constructor(public readonly MemberId: string,
                public readonly Username: string,
                public readonly Coins: number,
                public readonly CountFriends: number) {}
}