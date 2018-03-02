import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../login/login";
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'image-map-resizer';

declare var jquery:any;
declare var $ :any;


@IonicPage()
@Component({
  selector: 'page-quienes-somos',
  templateUrl: 'quienes-somos.html',
})
export class QuienesSomosPage {

  displayName: string;
  logged: boolean;
  uidUser: string;

  datos: FirebaseObjectObservable<any>;
  dato: string;
  markers: number[][] =[[19,75], [20,90]];
  
  constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController,
    public afAuth: AngularFireAuth, public afDB: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      
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

    this.datos = afDB.object('datos/quienesSomos', { preserveSnapshot: true});

    this.datos.subscribe(v => {
      this.dato = v.val();
    })
  }

  onChange(marker) {
    console.log('Marker', marker);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      dismissOnPageChange: true
    });
    loader.present();
  }

  goToSignUp(){
    this.presentLoading();
    this.navCtrl.push('SignupPage');
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  goToLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  ionViewDidLoad(){
    $(document).ready(function() {
      console.log('entro');
      $('map').imageMapResize();
  });
  }

}
