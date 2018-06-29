import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewInventoryPage } from './new_inventory';

@NgModule({
    declarations: [
        NewInventoryPage,
    ],
    imports: [
        IonicPageModule.forChild(NewInventoryPage),
    ],
    exports: [
        NewInventoryPage
    ]
})
export class NewOrdersPageModule { }
