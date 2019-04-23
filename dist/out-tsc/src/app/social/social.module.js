import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialPage } from './social.page';
var SocialPageModule = /** @class */ (function () {
    function SocialPageModule() {
    }
    SocialPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: SocialPage }])
            ],
            declarations: [SocialPage]
        })
    ], SocialPageModule);
    return SocialPageModule;
}());
export { SocialPageModule };
//# sourceMappingURL=social.module.js.map