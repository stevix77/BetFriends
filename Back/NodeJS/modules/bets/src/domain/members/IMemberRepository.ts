import { Member } from "./Member";
import { MemberId } from "./MemberId";

export interface IMemberRepository {
    Save(member: Member): Promise<void>;
    GetByIdAsync(memberId: MemberId): Promise<Member|undefined>;

}