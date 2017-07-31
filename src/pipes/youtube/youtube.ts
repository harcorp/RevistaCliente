import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the YoutubePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youtube',
})
export class YoutubePipe implements PipeTransform {
  
  constructor(private dom: DomSanitizer){

  }

  transform(value, args) {
    value = "https://www.youtube.com/embed/" + value;
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
