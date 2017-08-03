import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/database';

/**
 * Generated class for the GetNamePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'getName',
})
export class GetNamePipe implements PipeTransform {

  constructor(private fb: FirebaseApp){

  }

  transform(value, args) {
    if(value != null){
      return new Promise(resolve => {
        this.fb.database().ref('/users/' + value + '/nombre').once('value')
          .then(v => {
            resolve(v.val());
          });
      })
    }
  }
}
