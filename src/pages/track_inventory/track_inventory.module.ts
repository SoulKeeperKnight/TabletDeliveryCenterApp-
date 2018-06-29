import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackInventoryPage } from './track_inventory';

@NgModule({
    declarations: [
        TrackInventoryPage,
    ],
    imports: [
        IonicPageModule.forChild(TrackInventoryPage),
    ],
    exports: [
        TrackInventoryPage
    ]
})
export class TrackInventoryPageModule { }
