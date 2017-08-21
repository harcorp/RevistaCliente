import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Slides } from 'ionic-angular';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";

@IonicPage()
@Component({
  selector: 'page-articulos',
  templateUrl: 'articulos.html',
})
export class ArticulosPage {

  items: FirebaseListObservable<any[]>;
  categorias: FirebaseListObservable<any[]>;
  banners: FirebaseListObservable<any[]>;

  sizeSubject: Subject<any>;
  displayName: string;
  uidUser: string;
  logged: boolean;

  @ViewChild('slide1') slide1: Slides;
  @ViewChild('slide2') slide2: Slides;
  
  
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

    this.banners = afDB.list('banners', {
      query: {
        equalTo: '1',
        orderByChild: 'type'
      },
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

  /*ionViewDidLoad() {
    console.log("entro 1");
    setTimeout(() => {
      this.update();
      console.log('entro');
    }, 6000);
  }*/

  ionViewDidEnter(){
    setTimeout(() => {
      this.update();
    }, 6000);
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      console.log('cambio');
      this.update();
    }, 6000);
  }
  
  update(){
      this.slide1.update();  
      this.slide1.loop = true;
      this.slide1.autoplay = 3000;
      this.slide1.autoplayDisableOnInteraction = false;
      this.slide1.startAutoplay();  
      
      this.slide2.update();  
      this.slide2.loop = true;
      this.slide2.autoplay = 3000;
      this.slide2.autoplayDisableOnInteraction = false;      
      this.slide2.startAutoplay(); 
  }

  filterBy(size: any) {
    this.sizeSubject.next(size); 
    setTimeout(() => {  
      this.update();
    }, 6000);
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
