import { Component, OnInit } from '@angular/core';
import { Miniature, MiniatureService } from 'src/app/_services/miniature.service';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetService } from 'src/app/_services/actionsheet.service';
import { CameraService } from 'src/app/_services/camera.service';

@Component({
  selector: 'app-mini-form',
  templateUrl: './mini-form.component.html',
  styleUrls: ['./mini-form.component.scss'],
})
export class MiniFormComponent implements OnInit {

  public mini = this.navParams.get('thismini');
  public isCreate = this.navParams.get('thisisCreate');
  public title = this.navParams.get('thistitle');
  public button = this.navParams.get('thisbutton');

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetService: ActionSheetService,
    private cameraService: CameraService,
    private miniatureService: MiniatureService,
    private navParams: NavParams) {
      this.isCreate = this.navParams.get('isCreate');
      this.title = this.navParams.get('title');
      this.button = this.navParams.get('button');
      if (this.isCreate) {
        this.mini = <Miniature>{
          imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          shared: false,
          id: -1
        };
      }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async doYouWantToSave() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'You have an unsaved miniature. Do you want to save it?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.createUpdateMini();
          }
        }, {
          text: 'No',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async doYouWantToDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this mini?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.miniatureService.deleteMini(this.mini);
            this.closeModal();
          }
        }, {
          text: 'No',
          handler: () => {
            this.closeModal();
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
          this.cameraService.takePhoto(this, "camera");
        }
      },
      {
        text: 'Upload Picture From Phone',
        icon: 'images',
        handler: () => {
          console.log('upload clicked');
          this.mini.imgUrl = this.cameraService.takePhoto(this, "upload");
      }
      }
    ]);
  }

  createUpdateMini() {
    if (this.isCreate) {
      this.mini.id = this.miniatureService.generateNewId();
      console.log(this.mini.id);
      this.miniatureService.createMini(this.mini);
      this.showToast("You successfully created a mini");
    } else {
      this.miniatureService.updateMini(this.mini);
      this.showToast("You successfully updated a mini");
    }
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
