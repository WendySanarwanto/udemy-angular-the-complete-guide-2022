import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: unknown, limit: number = 11): unknown {
    const strValue: string = <string> value;
    return strValue && strValue.length > limit ? (<string>value).substring(0, limit) + ' ...': value;
  }

}
