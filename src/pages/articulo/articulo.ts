import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs/Observable";


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
            public toastCtrl: ToastController) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        this.logged = false;        
        return;
      }
      this.uidUser = user.uid;
      this.displayName = user.uid;
      this.logged = true;      
    });
    
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  ionViewDidLoad() {
    this.pubId = this.navParams.get('pubId');
    this.articuloId = this.navParams.get('articuloId');
    this.articulo = this.afDB.object('/articulos/' + this.pubId + '/' + this.articuloId);
    this.comentarios = this.afDB.list('/comentarios/' + this.articuloId);
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });
    loader.present();
  }

  goToLogin(){
    this.presentLoading();
    this.navCtrl.push('LoginPage');
  }

  text() {
    let prompt = this.alertCtrl.create({
      title: 'Comentario de Texto',
      message: "Escriba su comentario.",
      inputs: [
        {
          name: 'comentario',
          placeholder: 'Comentario'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Comentar',
          handler: data => {
            console.log(data);
            let comentario: string = data.comentario;
            console.log(comentario);
            if(comentario.length > 255){
              this.presentToast('El comentario no puede superar los 255 caracteres');
              return false;
            }else{
              this.cargarComentarioTexto(comentario);
            }

          }
        }
      ]
    });
    prompt.present();
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  cargarComentarioTexto(mensaje: string){
    this.comentsUser = this.afDB.list('/user-comentarios/' + this.uidUser + '/' + this.articuloId);
    this.presentLoading();
    this.comentarios.push({
      aproved: false,
      texto: mensaje,
      type: 1,
      uid_user: this.uidUser
    }).then(result => {
      this.comentsUser.update(result.key, {
        aproved: false,
        texto: mensaje,
        type: 1,
        uid_user: this.uidUser
      }).then(resultado => {
        this.presentToast('Su comentario fue enviado con exito. A la espera de aprobación');
      });
    });
  }
}