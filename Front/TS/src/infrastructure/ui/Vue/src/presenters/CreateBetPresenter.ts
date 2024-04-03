import { CreateBetResponse, type ICreateBetOutputPort } from '../../../../../domain/features/CreateBetHandler';
import { Key } from './FriendsPresenter';
import { Subject } from 'rxjs';
export class CreateBetPresenter implements ICreateBetOutputPort {

    InvalidChip(): void {
        this.subjects.get(Key.CreateBetError)?.forEach(x => x.next("Invalid chips"))
    }
    FriendsIsEmpty(): void {
        this.subjects.get(Key.CreateBetError)?.forEach(x => x.next("One friend at least"))
    }
    DescriptionIsEmpty(): void {
        this.subjects.get(Key.CreateBetError)?.forEach(x => x.next("Description is empty"))
    }
    InvalidEndDate(): void {
        this.subjects.get(Key.CreateBetError)?.forEach(x => x.next("Invalid date"))
    }
    Present(createBetResponse: CreateBetResponse): void {
        throw new Error('Method not implemented.');
    }

    Subscribe<T>(key: Key, subject: Subject<T>) {
        if(this.subjects.has(key)) {
          this.subjects.get(key)?.push(subject);
          return;
        }
        this.subjects.set(key, [subject]);
      }
    
      private subjects: Map<Key, Subject<any>[]> = new Map();
}