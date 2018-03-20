import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'ArticulosPage';
  displayName: string;
  logged: boolean;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public modalCtrl: ModalController, public afAuth: AngularFireAuth) {
    this.initializeApp();

    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        this.logged = false;        
        return;
      }

      this.displayName = user.displayName;
      this.logged = true;      
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: 'ArticulosPage'},
      { title: 'Bandera Editorial', component: 'QuienesSomosPage'},
      { title: 'Librería', component: 'LibreriaDigitalPage'},
      { title: 'Artículos', component: 'LibreriaArticulosPage'},
      { title: 'Contacto', component: 'ContactoPage'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }

  goToLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  goToSignUp() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome(){
    this.nav.setRoot('ArticulosPage');
  }
}
