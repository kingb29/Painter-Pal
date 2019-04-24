import { Component, OnInit } from '@angular/core';
import { Miniature, MiniatureService } from 'src/app/_services/miniature.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetService } from 'src/app/_services/actionsheet.service';
import { CameraService } from 'src/app/_services/camera.service';

@Component({
  selector: 'app-mini-form',
  templateUrl: './mini-form.component.html',
  styleUrls: ['./mini-form.component.scss'],
})
export class MiniFormComponent implements OnInit {

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetService: ActionSheetService,
    private cameraService: CameraService,
    private miniatureService: MiniatureService) {
    this.newMini = <Miniature>{
      imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    };
  }

  newMini: Miniature;

  closeModal() {
    this.modalController.dismiss();
  }

  async doYouWantToSave() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'You have an unsaved miniature. Do you want to save it to your collection?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.createMini();
          }
        }, {
          text: 'No',
          handler: () => {
            this.closeModal();
            console.log(this.newMini);
          }
        }
      ]
    });

    await alert.present();
  }

  openActionSheet() {
    this.actionSheetService.present([
      {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.newMini.imgUrl = this.cameraService.takePhoto(this.cameraService.camera.PictureSourceType.CAMERA, this);
        }
      },
      {
        text: 'Upload Picture From Phone',
        icon: 'images',
        handler: () => {
          console.log('upload clicked');
          this.newMini.imgUrl = this.cameraService.takePhoto(this.cameraService.camera.PictureSourceType.PHOTOLIBRARY, this);
      }
      }
    ]);
  }

  createMini() {
    console.log(this.newMini);
    this.miniatureService.createMini(this.newMini);
    this.showToast("You successfully created a mini");
    this.closeModal();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      showCloseButton: true
    });
    toast.present();
  }

  ngOnInit() {
  }

}
