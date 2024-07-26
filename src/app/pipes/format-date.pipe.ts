import { Pipe } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe {
  transform(date: string, format: string = 'DD/MM/YYYY'): string {
    return dayjs(date).format(format);
  }
}
