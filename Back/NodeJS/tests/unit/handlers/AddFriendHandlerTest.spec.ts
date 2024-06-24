import { describe, test } from 'vitest';
import  {v4 as uuidv4} from 'uuid';
import { AddFriendSut } from '../SUTs/AddFriendSut';

describe('add friend handler', () => {
    test('should add friend when member known', async () => {
        (await new AddFriendSut(uuidv4())
                            .WithMemberId(uuidv4())
                            .WithMemberRepository()
                            .WhenExecuteHandler())
                            .ShouldCreateFriendship();
    })

    test('should not add friend when member does not exist', async () => {
        (await new AddFriendSut(uuidv4())
                            .WithMemberId(uuidv4())
                            .WithEmptyMemberRepository()
                            .WhenExecuteHandler())
                            .ShouldNotCreateFriendship();
    })
})