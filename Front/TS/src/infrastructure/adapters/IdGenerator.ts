import { IIdGenerator } from '../../domain/abstractions/IIdGenerator';
import { v4 as uuidv4 } from 'uuid';
export class IdGenerator implements IIdGenerator {
    Generate(): string {
        return uuidv4();
    }

}