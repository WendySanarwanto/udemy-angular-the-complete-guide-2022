import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any): any {
    return value.sort((left: any, right: any) => left['name'] > right['name'] ? 1 : -1 );
  }

}
