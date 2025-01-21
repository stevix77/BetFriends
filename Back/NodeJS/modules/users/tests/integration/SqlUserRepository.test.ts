import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { SqlUserRepository } from "../../src/infrastructure/repositories/SqlUserRepository";
import { DomainEventAccessor } from "../../../shared/infrastructure/events/DomainEventAccessor";
import { UserContext } from "../../src/infrastructure/dataAccess/UserContext";
import { DataSource, QueryRunner } from "typeorm";
import { UserEntity } from "../../src/infrastructure/dataAccess/UserEntity";
import sql, { ConnectionPool } from 'mssql'
import { User } from "../../src/domain/users/User";
import { UserSnapshot } from "../../src/domain/users/UserSnapshot";
const config = {
    user: 'sa',                 // Nom d'utilisateur
    password: 'Password!', // Mot de passe
    server: 'localhost,1433\\sqlserv-betfriends',        // Adresse du serveur
    database: 'betfriends',   // Nom de la base de données
    options: {
      encrypt: false,           // Pour SQL Server local, désactiver SSL
      trustServerCertificate: true // Si SSL est activé mais non signé
    },
    pool: {
      max: 10,                  // Nombre max de connexions dans le pool
      min: 0,                   // Nombre min de connexions dans le pool
      idleTimeoutMillis: 30000  // Temps avant qu'une connexion inactive soit fermée
    }
  };

describe('sql user repository', () => {
    let context: UserContext;
    let dataSource: DataSource;
    beforeAll(async () => {
        dataSource = new DataSource({
            type: "mssql",
            host: 'localhost',
            database: "betfriends",
            logging: true,
            entities: [UserEntity],
            extra: {
                trustServerCertificate: true,
                Encrypt: false
            },
            port: 1433,
            username: "sa",
            password: "Password!",
            connectionTimeout: 30000
        })
        await dataSource.initialize();
        context = new UserContext(dataSource)
      });
      afterAll(async () => {
        await dataSource.getRepository(UserEntity).clear()
      })
    test('should save new user', async () => {
        const repository = new SqlUserRepository(context, new DomainEventAccessor()); 
        await repository.Save(User.FromSnapshot(new UserSnapshot("aeaeaeae-aaaa-aaaa-aaaa-aeaeaeaeaeae", "username", "email", "password", "refreshtoken")))
        const entity = await repository.GetEntityById("aeaeaeae-aaaa-aaaa-aaaa-aeaeaeaeaeae")
        expect(entity).toBeDefined()
    })

    test('should return that user does not exist', async () => {
        const repository = new SqlUserRepository(context, new DomainEventAccessor()); 
        const exist = await repository.IsExists('', '00000000-1111-1111-1111-111111111111', '')
        expect(exist).toBeFalsy()
    })

    test('should return that user exist', async () => {
        await context.UserEntity.save({
            Id: '00000000-1111-1111-1111-000000000000',
            Email: 'email',
            Password: 'password',
            Username: 'username',
            RefreshToken: 'refreshtoken'
        })
        const repository = new SqlUserRepository(context, new DomainEventAccessor()); 
        const exist = await repository.IsExists('', '00000000-1111-1111-1111-000000000000', '')
        expect(exist).toBeTruthy()
    })
})