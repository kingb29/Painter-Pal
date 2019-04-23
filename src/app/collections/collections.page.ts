import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';

import { MiniatureService, Miniature } from '../_services/miniature.service';
import { ActionSheetService } from '../_services/actionsheet.service';
import { CameraService } from '../_services/camera.service';

@Component({
  selector: 'app-collections',
  templateUrl: 'collections.page.html',
  styleUrls: ['collections.page.scss']
})
export class CollectionsPage {
  miniatures: Miniature[] = [];
  images: any[];
 
  newMini: Miniature = <Miniature>{};
 
  @ViewChild('mylist')mylist: IonList;
 
  constructor(
    private storageService: MiniatureService, 
    private plt: Platform, 
    private router: Router,
    private toastController: ToastController, 
    public actionSheetService: ActionSheetService, 
    public cameraService: CameraService) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }
 
  // CREATE
  addItem() {
    this.newMini.modified = Date.now();
    this.newMini.id = Date.now();
 
    this.storageService.addItem(this.newMini).then(item => {
      this.newMini = <Miniature>{};
      this.showToast('Item added!')
      this.loadItems(); // Or add it to the array directly
    });
  }
 
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.miniatures = items;
    });
  }
 
  // UPDATE
  updateItem(item: Miniature) {
    item.title = `UPDATED: ${item.title}`;
    item.modified = Date.now();
 
    this.storageService.updateItem(item).then(item => {
      this.showToast('Item updated!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or update it inside the array directly
    });
  }
 
  // DELETE
  deleteItem(item: Miniature) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Item removed!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }

  // CLEAR ALL
  clearData() {
    this.storageService.clearData();
  }
 
  // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  openActionSheet() {
    this.actionSheetService.present([
      {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.images = this.cameraService.takePhoto(this.cameraService.camera.PictureSourceType.CAMERA, this);
        }
      },
      {
        text: 'Upload Picture From Phone',
        icon: 'images',
        handler: () => {
          console.log('upload clicked');
          this.images = this.cameraService.takePhoto(this.cameraService.camera.PictureSourceType.PHOTOLIBRARY, this);
          //this.router.navigate(['/collections/collections-form', image]);
      }
      },
      {
        text: 'Dont Upload Photo',
        icon: 'sad',
        handler: () => {console.log('dont upload clicked');}
      }
    ]);
  }
}
