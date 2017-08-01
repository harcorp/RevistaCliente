import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
  }

  goToArticulo(articuloId: string, pubId: string){
    this.presentLoading();
    this.navCtrl.push('ArticuloPage', { articuloId, pubId});
  }
  
  ionViewDidLoad() {
    this.pubId = this.navParams.get('pubId');
    this.items = this.afDB.list('/articulos/' + this.pubId);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      dismissOnPageChange: true
    });
    loader.present();
  }
}
