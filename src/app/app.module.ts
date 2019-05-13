// Angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Mobile stuff
import { IonicModule, IonicRouteStrategy,  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

// this specific project stuff
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniatureService } from './_services/miniature.service';
import { ActionSheetService } from './_services/actionsheet.service';
import { CameraService } from './_services/camera.service';
import { SettingsComponent } from './settings/settings.component';

// database stuff
import { IonicStorageModule } from '@ionic/storage';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent, SettingsComponent],
  entryComponents: [SettingsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    ActionSheetService,
    CameraService,
    Camera,
    File,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MiniatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}