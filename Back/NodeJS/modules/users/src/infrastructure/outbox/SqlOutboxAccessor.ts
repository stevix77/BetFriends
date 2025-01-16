import { IOutboxAccessor } from "../../../../shared/infrastructure/outbox/IOutboxAccessor";
import { Outbox } from "../../../../shared/infrastructure/outbox/Outbox";
import sql, { ConnectionPool, MAX } from "mssql";

export class SqlOutboxAccessor implements IOutboxAccessor {

    constructor(private readonly pool: ConnectionPool){
        
    }

    async GetAll(): Promise<Outbox[]> {
        const req = await this.pool.request()
                                .query<GetAllOutbox>(`SELECT Id, 
                                                Type, 
                                                Data, 
                                                occured_on OccuredOn 
                                        FROM usr.outbox 
                                        WHERE processed_on is null`)

        const outboxes: Outbox[] = [];
        for(let record of req.recordset) {
            outboxes.push(new Outbox(record.Id!,
                                        record.Type!,
                                        record.Data!,
                                        record.OccuredOn!))
                                    
        }
        return outboxes;
    }
    async Save(outbox: Outbox): Promise<void> {
        const result = await this.pool.request()
                    .input('id', sql.VarChar(50), outbox.Id)
                    .query(`SELECT Id
                            FROM usr.outbox 
                            WHERE Id = @id`)
        if(result.recordsets.length as number > 0) {
            await this.pool.request()
                        .input('id', sql.VarChar(50), outbox.Id)
                        .input('processedon', sql.DateTime, outbox.HandledAt)
                        .query(`UPDATE usr.outbox
                                SET processed_on = @processedon
                                WHERE Id = @id`)
            return;
        }
        await this.pool.request()
                    .input('id', sql.VarChar(50), outbox.Id)
                    .input('type', sql.VarChar(50), outbox.Type)
                    .input('data', sql.VarChar(MAX), outbox.Data)
                    .input('occuredOn', sql.VarChar, outbox.CreatedAt)
                    .query(`INSERT INTO usr.outbox (id, type, data, occured_on)
                            VALUES (@id, @type, @data, @occuredOn)`)
    }

}

export class GetAllOutbox {
    Id?: string;
    Data?: string;
    Type?: string;
    OccuredOn?: Date;
}