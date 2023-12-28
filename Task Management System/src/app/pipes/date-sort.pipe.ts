
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    return [...array].sort((a, b) => {
      const dateComparison = new Date(a[field]).getTime() - new Date(b[field]).getTime();
      return dateComparison !== 0 ? dateComparison : array.indexOf(a) - array.indexOf(b);
    });
  }
  
}
