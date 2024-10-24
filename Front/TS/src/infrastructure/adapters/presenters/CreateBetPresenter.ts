import { CreateBetResponse, type ICreateBetOutputPort } from '../../../domain/features/CreateBetHandler';
import { Presenter } from './Presenter';
export class CreateBetPresenter extends Presenter implements ICreateBetOutputPort {

    InvalidChip(): void {
        this.subjects.get(Key.CreateBetError.toString())?.forEach(x => x.next("Invalid chips"))
    }
    FriendsIsEmpty(): void {
        this.subjects.get(Key.CreateBetError.toString())?.forEach(x => x.next("One friend at least"))
    }
    DescriptionIsEmpty(): void {
        this.subjects.get(Key.CreateBetError.toString())?.forEach(x => x.next("Description is empty"))
    }
    InvalidEndDate(): void {
        this.subjects.get(Key.CreateBetError.toString())?.forEach(x => x.next("Invalid date"))
    }
    Present(createBetResponse: CreateBetResponse): void {
        this.subjects.get(Key.Success.toString())?.forEach(x => x.next(createBetResponse))
    }
}




export enum Key {
    CreateBetError,
    Success
}