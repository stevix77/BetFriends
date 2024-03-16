import { describe, expect, test } from 'vitest';
import { CreateBetSut } from '../SUTs/CreateBetSut';

describe('create bet handler', () => {
    test('should create bet when request is valid', async () => {
        (await new CreateBetSut()
        .WithRequest({
            Description: "description",
            EndDate: new Date(2024, 4, 1),
            Chips: 20,
            Friends: ["friendId1"]
        })
        .WithCurrentDate(new Date(2023, 5, 1))
        .WhenExecuteHandler())
        .BetShouldBeCreated()
    })

    test('should not create bet when end date is in the past', async () => {
        (await new CreateBetSut()
        .WithRequest({
            Description: "description",
            EndDate: new Date(2024, 4, 1),
            Chips: 20,
            Friends: ["friendId1"]
        })
        .WithCurrentDate(new Date(2024, 5, 1))
        .WhenExecuteHandler())
        .BetIsNotCreated("Invalid end date")
    })

    test('should not create bet when desription is empty', async () => {
        (await new CreateBetSut()
        .WithRequest({
            Description: "",
            EndDate: new Date(2024, 4, 1),
            Chips: 20,
            Friends: ["friendId1"]
        })
        .WithCurrentDate(new Date(2024, 3, 1))
        .WhenExecuteHandler())
        .BetIsNotCreated("Description is empty")
    })

    test('should not create bet when friends is empty', async () => {
        (await new CreateBetSut()
        .WithRequest({
            Description: "description",
            EndDate: new Date(2024, 4, 1),
            Chips: 20,
            Friends: []
        })
        .WithCurrentDate(new Date(2024, 3, 1))
        .WhenExecuteHandler())
        .BetIsNotCreated("Should bet with at least one friend")
    })

    test('should not create bet without chip', async () => {
        (await new CreateBetSut()
        .WithRequest({
            Description: "description",
            EndDate: new Date(2024, 4, 1),
            Chips: 0,
            Friends: ["friends1"]
        })
        .WithCurrentDate(new Date(2024, 3, 1))
        .WhenExecuteHandler())
        .BetIsNotCreated("Should bet with at least one chip")
    })
})