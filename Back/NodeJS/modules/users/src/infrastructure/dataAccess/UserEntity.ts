import { Column, Entity } from "typeorm";
import { UserSnapshot } from "../../domain/users/UserSnapshot";

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
        name: 'id'
    })
    Id: string;
    @Column({
        name: 'username'
    })
    Username: string;
    @Column({
        name: 'email'
    })
    Email: string;
    @Column({
        name: 'password'
    })
    Password: string;
    @Column({
        name: 'refresh_token'
    })
    RefreshToken: string;
    @Column({
        name: 'created_at'
    })
    CreatedAt: Date;
    @Column({
        name: 'surrogate_id'
    })
    SurrogateId: number;
}