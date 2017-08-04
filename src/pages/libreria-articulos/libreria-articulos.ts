import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-libreria-articulos',
  templateUrl: 'libreria-articulos.html',
})
export class LibreriaArticulosPage {

  articulos: FirebaseListObservable<any>;

  constructor(private afAuth : AngularFireAuth, private afDb: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {

    this.articulos = this.afDb.list('/biblioteca_articulos', {
      query: {
        orderByChild: 'fecha'
      }
    });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
