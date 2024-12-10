import { IHashService } from "../../domain/abstractions/IHashService"
import { sha256 } from 'js-sha256';

export class Sha256Hash implements IHashService {
    Hash(password: string): string {
        return sha256(password);
    }

}