import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const date = value.split('T')[0];
    const splitDate = date.split('-');
    return splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];
  }
}
