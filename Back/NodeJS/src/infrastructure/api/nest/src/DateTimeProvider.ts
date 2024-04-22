import { IDateTimeProvider } from '../../../../domain/IDateTimeProvider';
export class DateTimeProvider implements IDateTimeProvider {
    GetDate(): Date {
        return new Date()
    }

}