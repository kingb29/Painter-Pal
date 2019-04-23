import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MorePage } from './more.page';
var MorePageModule = /** @class */ (function () {
    function MorePageModule() {
    }
    MorePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: MorePage }])
            ],
            declarations: [MorePage]
        })
    ], MorePageModule);
    return MorePageModule;
}());
export { MorePageModule };
//# sourceMappingURL=more.module.js.map