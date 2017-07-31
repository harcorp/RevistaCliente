import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@IonicPage({
  segment: 'articulo/:pubId'
})
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  pubId: string;
  articulo: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private afDB: AngularFireDatabase, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    this.pubId = this.navParams.get('pubId');
    this.articulo = this.afDB.object('/articulos/' + this.pubId);
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000
    });
    loader.present();
  }
}
