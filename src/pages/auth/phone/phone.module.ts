import { NgModule } from '@angular/core';
import { PhonePage } from './phone';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    PhonePage,
  ],
  imports: [
    IonicPageModule.forChild(PhonePage),
  ],
  exports: [
    PhonePage
  ]
})
export class PhonePageModule {}
