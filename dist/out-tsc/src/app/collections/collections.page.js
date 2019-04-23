import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { MiniatureService } from '../_services/miniature.service';
import { ActionSheetService } from '../_services/actionsheet.service';
import { CameraService } from '../_services/camera.service';
var CollectionsPage = /** @class */ (function () {
    function CollectionsPage(storageService, plt, router, toastController, actionSheetService, cameraService) {
        var _this = this;
        this.storageService = storageService;
        this.plt = plt;
        this.router = router;
        this.toastController = toastController;
        this.actionSheetService = actionSheetService;
        this.cameraService = cameraService;
        this.miniatures = [];
        this.newMini = {};
        this.plt.ready().then(function () {
            _this.loadItems();
        });
    }
    // CREATE
    CollectionsPage.prototype.addItem = function () {
        var _this = this;
        this.newMini.modified = Date.now();
        this.newMini.id = Date.now();
        this.storageService.addItem(this.newMini).then(function (item) {
            _this.newMini = {};
            _this.showToast('Item added!');
            _this.loadItems(); // Or add it to the array directly
        });
    };
    // READ
    CollectionsPage.prototype.loadItems = function () {
        var _this = this;
        this.storageService.getItems().then(function (items) {
            _this.miniatures = items;
        });
    };
    // UPDATE
    CollectionsPage.prototype.updateItem = function (item) {
        var _this = this;
        item.title = "UPDATED: " + item.title;
        item.modified = Date.now();
        this.storageService.updateItem(item).then(function (item) {
            _this.showToast('Item updated!');
            _this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
            _this.loadItems(); // Or update it inside the array directly
        });
    };
    // DELETE
    CollectionsPage.prototype.deleteItem = function (item) {
        var _this = this;
        this.storageService.deleteItem(item.id).then(function (item) {
            _this.showToast('Item removed!');
            _this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
            _this.loadItems(); // Or splice it from the array directly
        });
    };
    // CLEAR ALL
    CollectionsPage.prototype.clearData = function () {
        this.storageService.clearData();
    };
    // Helper
    CollectionsPage.prototype.showToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionsPage.prototype.openActionSheet = function () {
        var _this = this;
        this.actionSheetService.present([
            {
                text: 'Take Picture',
                icon: 'camera',
                handler: function () {
                    console.log('camera clicked');
                    _this.images = _this.cameraService.takePhoto(_this.cameraService.camera.PictureSourceType.CAMERA, _this);
                }
            },
            {
                text: 'Upload Picture From Phone',
                icon: 'images',
                handler: function () {
                    console.log('upload clicked');
                    _this.images = _this.cameraService.takePhoto(_this.cameraService.camera.PictureSourceType.PHOTOLIBRARY, _this);
                    //this.router.navigate(['/collections/collections-form', image]);
                }
            },
            {
                text: 'Dont Upload Photo',
                icon: 'sad',
                handler: function () { console.log('dont upload clicked'); }
            }
        ]);
    };
    tslib_1.__decorate([
        ViewChild('mylist'),
        tslib_1.__metadata("design:type", IonList)
    ], CollectionsPage.prototype, "mylist", void 0);
    CollectionsPage = tslib_1.__decorate([
        Component({
            selector: 'app-collections',
            templateUrl: 'collections.page.html',
            styleUrls: ['collections.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MiniatureService,
            Platform,
            Router,
            ToastController,
            ActionSheetService,
            CameraService])
    ], CollectionsPage);
    return CollectionsPage;
}());
export { CollectionsPage };
//# sourceMappingURL=collections.page.js.map