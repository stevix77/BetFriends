import { IDateTimeProvider } from '../../../modules/shared/domain/IDateTimeProvider';
export class DateTimeProvider implements IDateTimeProvider {
    GetDate(): Date {
        return new Date()
    }

}