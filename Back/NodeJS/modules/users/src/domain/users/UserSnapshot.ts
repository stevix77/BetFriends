export class UserSnapshot {
    constructor(public readonly UserId: string, 
                public readonly Username: string, 
                public readonly Email: string, 
                public readonly Password: string,
                public readonly RefreshToken: string) {}
}