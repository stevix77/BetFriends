import { Member } from "./Member";
import { MemberId } from "./MemberId";

export interface IMemberRepository {
    GetByIdAsync(memberId: MemberId): PromiseLike<Member>;

}