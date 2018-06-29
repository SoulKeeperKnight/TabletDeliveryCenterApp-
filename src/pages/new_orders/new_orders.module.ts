import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOrdersPage } from './new_orders';

@NgModule({
    declarations: [
        NewOrdersPage,
    ],
    imports: [
        IonicPageModule.forChild(NewOrdersPage),
    ],
    exports: [
        NewOrdersPage
    ]
})
export class NewOrdersPageModule { }
