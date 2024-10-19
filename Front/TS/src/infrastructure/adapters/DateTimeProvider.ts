import { IDateTimeProvider } from '../../domain/abstractions/IDateTimeProvider';
import moment from 'moment';
export class DateTimeProvider implements IDateTimeProvider {
    GetDate(): Date {
        return moment().toDate()
    }

}