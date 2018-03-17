import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/database';

@Pipe({
  name: 'slides',
})
export class SlidesPipe implements PipeTransform {

  constructor(public fb: FirebaseApp){

  }

  transform(value, args) {
    return new Promise(resolve => {
      let keys = [];
      if(args !== undefined){
        this.fb.database().ref('/articulos/' + value).orderByChild('stack').equalTo(args).once('value', (snapshot) => {
          snapshot.forEach((snap) => {
            keys.push({
              $key: snap.key,
              $value: snap.val()
            });
            return false;
          });
          resolve(keys);
        });
      } else {
        this.fb.database().ref('/articulos/' + value).once('value', (snapshot) => {
          snapshot.forEach((snap) => {
            keys.push({
              $key: snap.key,
              $value: snap.val()
            });
            return false;
          });
          resolve(keys);
        });
      }
    });
  } 
}
