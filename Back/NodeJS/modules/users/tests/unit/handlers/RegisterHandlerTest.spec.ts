import { describe, expect, test } from "vitest";
import { RegisterCommand } from "../../../src/application/features/register/RegisterCommand";
import { RegisterHandler } from "../../../src/application/features/register/RegisterHandler";
import { UserSnapshot } from "../../../src/domain/users/UserSnapshot";
import { MockRegisterOutputPort } from "../implems/MockRegisterOutputPort";
import { MockUserRepository } from "../implems/MockUserRepository";
import { StubPasswordHasher } from "../implems/StubPasswordHasher";
import { User } from "../../../src/domain/users/User";

describe('Register new user', () => {
    test('Should register new user', async () => {
        const command = new RegisterCommand("userId", "username", "email", "password");
        const registerOutputPort = new MockRegisterOutputPort();
        const userRepository = new MockUserRepository();
        const handler = new RegisterHandler(registerOutputPort, userRepository, new StubPasswordHasher("hashedpassword"));
        await handler.Handle(command)
        expect(registerOutputPort.Message).toEqual("registered")
        expect(userRepository.User?.GetSnapshot()).toEqual(new UserSnapshot("userId", "username", "email", "hashedpassword"))
    })

    test('Should not register new user when userid or username or email already exist', async () => {
        const command = new RegisterCommand("userId", "username", "email", "password");
        const registerOutputPort = new MockRegisterOutputPort();
        const user = User.FromSnapshot(new UserSnapshot("userId", "username", "email", "password"))
        const userRepository = new MockUserRepository(user);
        const handler = new RegisterHandler(registerOutputPort, userRepository, new StubPasswordHasher("hashedpassword"));
        await handler.Handle(command)
        expect(registerOutputPort.Message).toEqual("not registered")
    })
})