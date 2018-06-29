import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { BackGroundPage } from './background';

@NgModule({
    declarations: [
        BackGroundPage,
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(BackGroundPage),
    ],
    exports: [
        BackGroundPage
    ]
})
export class BackGroundPageModule { }
