import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingPage } from './shopping.page';
var ShoppingPageModule = /** @class */ (function () {
    function ShoppingPageModule() {
    }
    ShoppingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: ShoppingPage }])
            ],
            declarations: [ShoppingPage]
        })
    ], ShoppingPageModule);
    return ShoppingPageModule;
}());
export { ShoppingPageModule };
//# sourceMappingURL=shopping.module.js.map