import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSearchPage } from './allsearch';

@NgModule({
    declarations: [
        AllSearchPage,
    ],
    imports: [
        IonicPageModule.forChild(AllSearchPage),
    ],
    exports: [
        AllSearchPage
    ]
})
export class AllSearchPageModule { }
