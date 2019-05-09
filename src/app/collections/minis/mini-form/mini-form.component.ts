import { Component, OnInit } from '@angular/core';
import { Miniature, MiniatureService } from 'src/app/_services/miniature.service';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetService } from 'src/app/_services/actionsheet.service';
import { CameraService } from 'src/app/_services/camera.service';
import { SocialfeedService } from 'src/app/_services/socialfeed.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Paint, PaintService } from 'src/app/_services/paint.service';

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

  public paints: Paint[];


  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private paintService: PaintService,
    private actionSheetService: ActionSheetService,
    private cameraService: CameraService,
    private miniatureService: MiniatureService,
    private socialFeedService: SocialfeedService,
    private navParams: NavParams) {

      this.isCreate = this.navParams.get('isCreate');
      this.title = this.navParams.get('title');
      this.button = this.navParams.get('button');
      if (this.isCreate) {
        this.mini = <Miniature>{
          imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          shared: false,
          id: -1,
          paints: []
        };
      }

      this.paints = this.paintService.getPaints();
  }

  validate() {
    if (this.mini.title !== undefined) {
      if ((this.mini.shared && this.mini.postTitle !== undefined) || !this.mini.shared) {
        return true;
      } else {
        return false; // no postTitle if shared
      }
    } else {
      return false; // no title
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  doesMiniHaveThisPaint(paint) {
    return this.miniatureService.doesMiniHaveThisPaint(paint, this.mini);
  }

  checkOrUncheckPaint(event, paint) {
    if (event.detail.checked) {
      this.mini.paints.push(paint);
    } else {
        const index = this.mini.paints.findIndex((e) => e.id === paint.id);
        if (index === -1) {
        console.log("paint not found");
        } else {
            this.mini.paints.splice(index, 1);
        }
    }
  }

  checkIfMiniIsDifferent() {
    this.doYouWantToSave();
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
            this.socialFeedService.deletePost(this.mini);
            this.showToast("You successfully deleted a mini");
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
    if (this.validate()) {
      if (this.isCreate) {
        this.mini.id = this.miniatureService.generateNewId();
        this.miniatureService.createMini(this.mini);
        if (this.mini.shared) {
          this.socialFeedService.createOrUpdatePost(this.mini, this.mini.postTitle, "testuser");
        }
        this.showToast("You successfully created a mini");
      } else {
        this.miniatureService.updateMini(this.mini);
        if (this.mini.shared) {
          this.socialFeedService.createOrUpdatePost(this.mini, this.mini.postTitle, "testuser");
        } else {
          if (this.socialFeedService.doesPostExistByMiniId(this.mini)) {
            this.socialFeedService.deletePost(this.mini);
          }
        }
        this.showToast("You successfully updated a mini");
      }
      this.closeModal();
    } else {
      return false;
    }
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    console.log(this.mini);
  }

}
