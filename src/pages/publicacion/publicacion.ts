import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage({
  segment: 'publicacion/:pubId'
})
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {

  pubId: string;
  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
  }

  goToArticulo(pubId: string){
    this.navCtrl.setRoot('ArticuloPage', { pubId });
  }
  
  ionViewDidLoad() {
    this.pubId = this.navParams.get('pubId');
    this.items = this.afDB.list('/articulos/' + this.pubId);
  }
}
