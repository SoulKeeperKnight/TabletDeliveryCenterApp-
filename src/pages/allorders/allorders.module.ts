import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllOrdersPage } from './allorders';

@NgModule({
    declarations: [
        AllOrdersPage,
    ],
    imports: [
        IonicPageModule.forChild(AllOrdersPage),
    ],
    exports: [
        AllOrdersPage
    ]
})
export class AllOrdersPagePageModule { }
