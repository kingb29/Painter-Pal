import { Injectable } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor(public camera: Camera, private webview: WebView, private platform: Platform) { }

  imgUrl: any;

  takePhoto(component: any, sourceType) {

    sourceType = (sourceType == "camera")? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      correctOrientation: true
    }
      this.camera.getPicture(options).then((url) => {
        component.newMini.imgUrl = this.webview.convertFileSrc(url);
        console.log(component.newMini.imgUrl);
    });
  }
}
