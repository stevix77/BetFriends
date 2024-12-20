import { describe, expect, test } from 'vitest';
import { IRegisterRequest, RegisterHandler } from '../../../src/domain/features/RegisterHandler';
import { StubIdGenerator } from '../implems/StubIdGenerator';
import { StubPasswordHasher } from '../implems/StubPasswordHasher';
import { MockRegisterPresenter } from '../implems/MockRegisterPresenter';
import { MockUserGateway } from '../implems/MockUserGateway';
describe('register user', () => {
    test('should create new registration', async () => {
        const request: IRegisterRequest = {
            username: "username",
            email: "email",
            password: "password",
            confirmPassword: "password"
        }
        const gateway = new MockUserGateway();
        const presenter = new MockRegisterPresenter();
        const idGenerator = new StubIdGenerator("id");
        const hashPwd = new StubPasswordHasher("hashed")
        const handler = new RegisterHandler(gateway, presenter, idGenerator, hashPwd);
        await handler.Handle(request);
        expect(presenter.UserId).toEqual(idGenerator.Generate())
        expect(gateway.User).toEqual({
            id: "id",
            username: "username",
            email: "email",
            password: "hashedpassword"
        })
    })

    test('should not create registration when one field is empty', async () => {
        const request: IRegisterRequest = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
        const presenter = new MockRegisterPresenter();
        const handler = new RegisterHandler(undefined!, presenter, undefined!, undefined!);
        await handler.Handle(request);
        expect(presenter.Error).toEqual("field is empty")
    })

    test('should not create registration when passwords are not equal', async () => {
        const request: IRegisterRequest = {
            username: "username",
            email: "email",
            password: "password",
            confirmPassword: "pword"
        }
        const presenter = new MockRegisterPresenter();
        const handler = new RegisterHandler(undefined!, presenter, undefined!, undefined!);
        await handler.Handle(request);
        expect(presenter.Error).toEqual("passwords are different")
    })
})




