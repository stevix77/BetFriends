import { describe, expect, test } from 'vitest';
import  {v4 as uuidv4} from 'uuid';
import { CreateBetCommand } from '../../../src/application/features/create-bet/CreateBetHandler';
import { CreateBetSut } from '../SUTs/CreateBetSut';
import { Member } from '../../../src/domain/members/Member';
import { MemberId } from '../../../src/domain/members/MemberId';
import { NotEnoughChipsException } from '../../../src/domain/members/exceptions/NotEnoughChipsException';
import { NoneFriendException } from '../../../src/domain/members/exceptions/NoneFriendException';

describe('create bet handler', () => {
    test('Should create bet when command request is valid', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 100, new Date(2025, 10, 1), [uuidv4()]))
                    .WhenExecuteHandler())
                    .ShouldCreateBet();
    })

    test('Should not create bet when requester is unknown', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 100, new Date(2025, 10, 1), [uuidv4()]))
                    .GivenEmptyMemberRepository()
                    .WhenExecuteHandler())
                    .ShouldNotCreateBet();
    })

    test('Should not create bet when requester has not enough chips', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 100, new Date(2025, 10, 1), [uuidv4()]))
                    .GivenRequester(new Member(new MemberId("memberId"), 50, 2))
                    .WhenExecuteHandler().catch(e => {
                        expect(e).toBeInstanceOf(NotEnoughChipsException)
                    }))
    })

    test('Should not create bet when end date is too old', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 100, new Date(2023, 10, 1), [uuidv4()]))
                    .WhenExecuteHandler())
                    .ShouldNotCreateBet();
    })

    test('Should not create bet when requester has no friend', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 100, new Date(2025, 10, 1), [uuidv4()]))
                    .GivenRequester(new Member(new MemberId("memberId"), 1000, 0))
                    .WhenExecuteHandler().catch(e => {
                        expect(e).toBeInstanceOf(NoneFriendException)
                    }))
    })

    test('Should not create bet with 0 chip', async () => {
        (await new CreateBetSut()
                    .GivenCommand(new CreateBetCommand("betId", "description", 0, new Date(2025, 10, 1), [uuidv4()]))
                    .WhenExecuteHandler())
                    .ShouldNotCreateBet();
    })
})