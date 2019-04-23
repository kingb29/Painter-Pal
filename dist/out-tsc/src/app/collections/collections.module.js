import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionsPage } from './collections.page';
var CollectionsPageModule = /** @class */ (function () {
    function CollectionsPageModule() {
    }
    CollectionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: CollectionsPage }])
            ],
            declarations: [CollectionsPage]
        })
    ], CollectionsPageModule);
    return CollectionsPageModule;
}());
export { CollectionsPageModule };
//# sourceMappingURL=collections.module.js.map