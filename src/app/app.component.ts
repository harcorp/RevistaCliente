import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'ArticulosPage';

  pages: Array<{title: string, component: any, icon: string}>;
  pages2: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Libreria Digital', component: 'LibreriaDigitalPage', icon: 'list-box'},
      { title: 'Articulos', component: 'LibreriaArticulosPage', icon: 'list-box'}
    ];
    this.pages2 = [
      { title: 'Quienes Somos', component: 'QuienesSomosPage', icon: 'contacts'},
      { title: 'Historia', component: 'HistoriaPage', icon: 'medal'},
      { title: 'Contacto', component: 'ContactoPage', icon: 'mail'},
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
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
