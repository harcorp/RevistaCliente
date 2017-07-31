import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'firebase/storage';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@IonicPage({
  segment: ''
})
@Component({
  selector: 'page-articulos',
  templateUrl: 'articulos.html',
})
export class ArticulosPage {
  items: FirebaseListObservable<any[]>;
  categorias: FirebaseListObservable<any[]>;

  sizeSubject: Subject<any>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase,
              public firebaseApp: FirebaseApp, public loadingCtrl: LoadingController) {
    this.sizeSubject = new BehaviorSubject(undefined);
    this.items = afDB.list('/publicaciones', {
      query: {
        orderByChild: 'category',
        equalTo: this.sizeSubject
      }
    });
    
    this.categorias = afDB.list('/category_pub');
  }

  filterBy(size: any) {
    this.sizeSubject.next(size); 
  }

  navigateToPublicacion(pubId: string){
    this.presentLoading();
    this.navCtrl.setRoot('PublicacionPage', { pubId });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loader.present();
  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

  goToSignUp(){
    this.navCtrl.setRoot('SignupPage');
  }
}
