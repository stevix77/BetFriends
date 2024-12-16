import { Member } from "./Member";
import { MemberId } from "./MemberId";

export interface IMemberRepository {
    Save(member: Member): PromiseLike<void>;
    GetByIdAsync(memberId: MemberId): PromiseLike<Member|undefined>;

}