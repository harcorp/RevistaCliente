import { Component } from '@angular/core';
import { IonicPage, 
        NavController, 
        NavParams, 
        LoadingController, 
        AlertController, 
        ToastController,
        ModalController,
} from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";
import { LoginPage } from "../login/login";
import { ComentarioTextoPage } from "../comentario-texto/comentario-texto";
import { ComentarioVoicePage } from "../comentario-voice/comentario-voice";
import { ComentarioVideoPage } from "../comentario-video/comentario-video";
import { SignupPage } from "../signup/signup";


@IonicPage({
  segment: 'articulo/:pubId/:articuloId'
})
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  pubId: string;
  articuloId: string;
  uidUser: string;
  articulo: FirebaseObjectObservable<any>;

  user: Observable<firebase.User>;
  displayName: string;
  logged: boolean;

  comentarios: FirebaseListObservable<any>;
  comentsUser: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private afDB: AngularFireDatabase, public loadingCtrl: LoadingController,
            public afAuth: AngularFireAuth, public alertCtrl: AlertController, 
            public toastCtrl: ToastController, private modalCtrl: ModalController) {
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
  }

  ionViewDidLoad() {
    this.pubId = this.navParams.get('pubId');
    this.articuloId = this.navParams.get('articuloId');
    this.articulo = this.afDB.object('/articulos/' + this.pubId + '/' + this.articuloId);
    this.comentarios = this.afDB.list('/comentarios/' + this.articuloId,{
      query: {
        orderByChild: 'aproved',
        equalTo: true
      }
    });
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  modalComentarioTexto(){
    let modal = this.modalCtrl.create(ComentarioTextoPage, {uidUser: this.uidUser, articuloId: this.articuloId, pubId: this.pubId});
    modal.present();
  }

  modalComentarioVoice(){
    let modal = this.modalCtrl.create(ComentarioVoicePage, {uidUser: this.uidUser, articuloId: this.articuloId, pubId: this.pubId});
    modal.present();
  }

  modalComentarioVideo(){
    let modal = this.modalCtrl.create(ComentarioVideoPage, {uidUser: this.uidUser, articuloId: this.articuloId, pubId: this.pubId});
    modal.present();
  }
}