import { Column, Entity } from "typeorm";
import { UserSnapshot } from "../../domain/users/UserSnapshot";
import 'reflect-metadata';

@Entity({
    schema: 'usr',
    name: 'users'
})
export class UserEntity {
    static Create(userSnapshot: UserSnapshot): UserEntity {
        const entity = new UserEntity();
        entity.Email = userSnapshot.Email;
        entity.Id = userSnapshot.UserId;
        entity.Username = userSnapshot.Username;
        entity.Password = userSnapshot.Password;
        entity.RefreshToken = userSnapshot.RefreshToken;
        return entity;
    }
    @Column({
        name: 'id',
        type: 'uniqueidentifier',
        primary: true
    })
    Id: string;
    @Column({
        name: 'username',
        type: 'varchar'
    })
    Username: string;
    @Column({
        name: 'email',
        type: 'varchar'
    })
    Email: string;
    @Column({
        name: 'password',
        type: 'varchar'
    })
    Password: string;
    @Column({
        name: 'refresh_token',
        type: 'varchar'
    })
    RefreshToken: string;
}