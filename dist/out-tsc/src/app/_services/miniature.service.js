import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var COLLECTION_KEY = 'miniature';
var MiniatureService = /** @class */ (function () {
    function MiniatureService(storage) {
        this.storage = storage;
    }
    MiniatureService.prototype.addItem = function (item) {
        var _this = this;
        return this.storage.get(COLLECTION_KEY).then(function (items) {
            if (items) {
                items.push(item);
                return _this.storage.set(COLLECTION_KEY, items);
            }
            else {
                return _this.storage.set(COLLECTION_KEY, [item]);
            }
        });
    };
    // READ
    MiniatureService.prototype.getItems = function () {
        return this.storage.get(COLLECTION_KEY);
    };
    // UPDATE
    MiniatureService.prototype.updateItem = function (item) {
        var _this = this;
        return this.storage.get(COLLECTION_KEY).then(function (items) {
            if (!items || items.length === 0) {
                return null;
            }
            var newItems = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var i = items_1[_i];
                if (i.id === item.id) {
                    newItems.push(item);
                }
                else {
                    newItems.push(i);
                }
            }
            return _this.storage.set(COLLECTION_KEY, newItems);
        });
    };
    // DELETE
    MiniatureService.prototype.deleteItem = function (id) {
        var _this = this;
        return this.storage.get(COLLECTION_KEY).then(function (items) {
            if (!items || items.length === 0) {
                return null;
            }
            var toKeep = [];
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var i = items_2[_i];
                if (i.id !== id) {
                    toKeep.push(i);
                }
            }
            return _this.storage.set(COLLECTION_KEY, toKeep);
        });
    };
    MiniatureService.prototype.clearData = function () {
        // DANGER WILL ROBINSON
        // refresh page - doesn't reflect on page until you refresh
        this.storage.clear();
    };
    MiniatureService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage])
    ], MiniatureService);
    return MiniatureService;
}());
export { MiniatureService };
//# sourceMappingURL=miniature.service.js.map