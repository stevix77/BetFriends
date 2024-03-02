import { Friendship } from './Friendship';
export interface IFriendshipRepository {
    SaveAsync(friendship: Friendship): Promise<void>;
    
}