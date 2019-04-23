import * as tslib_1 from "tslib";
// Angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Mobile stuff
import { IonicModule, IonicRouteStrategy, } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
// this specific project stuff
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniatureService } from './_services/miniature.service';
import { ActionSheetService } from './_services/actionsheet.service';
import { CameraService } from './_services/camera.service';
// database stuff
import { IonicStorageModule } from '@ionic/storage';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
            providers: [
                StatusBar,
                SplashScreen,
                ActionSheetService,
                CameraService,
                Camera,
                File,
                WebView,
                FilePath,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                MiniatureService
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map