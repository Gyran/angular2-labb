import {Pipe} from 'angular2/core';

@Pipe({
    name: 'dateString'
})
class DateStringPipe {

    transform(dateString: string, args: string[]) {
        const [, year, month, day] = /^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec(dateString) || [,,,,];
        switch(args[0]) {
            case 'year':
                return year;
            case 'month':
                return month;
            case 'day':
                return day;
            default:
                return ''
        }
    }

}

export default DateStringPipe;
export {DateStringPipe};
