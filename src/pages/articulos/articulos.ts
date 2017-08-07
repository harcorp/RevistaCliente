import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'firebase/storage';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";

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
  displayName: string;
  uidUser: string;
  logged: boolean;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, afDB: AngularFireDatabase,
              public afAuth: AngularFireAuth, private modalCtrl: ModalController,
              public firebaseApp: FirebaseApp, public loadingCtrl: LoadingController) {
    this.sizeSubject = new BehaviorSubject(undefined);
    this.items = afDB.list('/publicaciones', {
      query: {
        orderByChild: 'category',
        equalTo: this.sizeSubject
      }
    });

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        this.logged = false;        
        return;
      }
      this.uidUser = user.uid;
      this.displayName = user.displayName;
      this.logged = true;      
    });
    
    this.categorias = afDB.list('/category_pub');
  }

  filterBy(size: any) {
    this.sizeSubject.next(size); 
  }

  navigateToPublicacion(pubId: string){
    this.presentLoading();
    this.navCtrl.push('PublicacionPage', { pubId });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      dismissOnPageChange: true
    });
    loader.present();
  }

  goToSignUp(){
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  goToLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}
