import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuienesSomosPage } from './quienes-somos';
import { PipesModule } from '../../pipes/pipes.module';
import { ImgMapComponent } from 'ng2-img-map';

@NgModule({
  declarations: [
    QuienesSomosPage,
    ImgMapComponent
  ],
  imports: [
    IonicPageModule.forChild(QuienesSomosPage),
    PipesModule
  ],
})
export class QuienesSomosPageModule {}
