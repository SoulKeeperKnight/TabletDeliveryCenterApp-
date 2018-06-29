import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsercollectionPage } from './usercollection';

@NgModule({
  declarations: [
    UsercollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(UsercollectionPage),
  ],
})
export class UsercollectionPageModule {}
