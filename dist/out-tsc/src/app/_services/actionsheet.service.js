import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
var ActionSheetService = /** @class */ (function () {
    function ActionSheetService(actionSheetCtrl) {
        this.actionSheetCtrl = actionSheetCtrl;
    }
    ActionSheetService.prototype.present = function (buttons) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buttons.push({
                            text: 'Cancel',
                            role: 'cancel',
                        });
                        return [4 /*yield*/, this.actionSheetCtrl.create({
                                buttons: buttons
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActionSheetService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController])
    ], ActionSheetService);
    return ActionSheetService;
}());
export { ActionSheetService };
//# sourceMappingURL=actionsheet.service.js.map