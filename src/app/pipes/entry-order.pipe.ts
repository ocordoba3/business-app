import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../models/entry';

@Pipe({
  name: 'entryOrder'
})
export class EntryOrderPipe implements PipeTransform {

  transform(items: Entry[]): Entry[] {
    return items = items.slice().sort((a, b) => {

      if (a.type === 'Ingreso') {
        return -1;
      } else {
        return 1;
      }

    });
  }

}
