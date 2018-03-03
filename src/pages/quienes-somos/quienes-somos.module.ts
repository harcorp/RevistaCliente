import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuienesSomosPage } from './quienes-somos';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    QuienesSomosPage
  ],
  imports: [
    IonicPageModule.forChild(QuienesSomosPage),
    PipesModule
  ],
})
export class QuienesSomosPageModule {}
