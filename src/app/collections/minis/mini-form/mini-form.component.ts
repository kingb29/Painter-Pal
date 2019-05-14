import { Component, OnInit } from '@angular/core';
import { Miniature, MiniatureService } from 'src/app/_services/miniature.service';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetService } from 'src/app/_services/actionsheet.service';
import { CameraService } from 'src/app/_services/camera.service';
import { SocialfeedService } from 'src/app/_services/socialfeed.service';
import { Paint, PaintService } from 'src/app/_services/paint.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mini-form',
  templateUrl: './mini-form.component.html',
  styleUrls: ['./mini-form.component.scss'],
})
export class MiniFormComponent implements OnInit {

  public unchangedMini: string;

  public mini = this.navParams.get('thismini');
  public isCreate = this.navParams.get('thisisCreate');
  public title = this.navParams.get('thistitle');
  public button = this.navParams.get('thisbutton');

  public paints: Paint[];

  public selectedImage;


  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private paintService: PaintService,
    private actionSheetService: ActionSheetService,
    private cameraService: CameraService,
    private miniatureService: MiniatureService,
    private socialFeedService: SocialfeedService,
    public sanitizer: DomSanitizer,
    private navParams: NavParams) {

      this.isCreate = this.navParams.get('isCreate');
      this.title = this.navParams.get('title');
      this.button = this.navParams.get('button');
      
      
      this.paints = this.paintService.getPaints();
      this.prepareColors();
  }

  validate() {
    return this.mini.title !== undefined;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  checkOrUncheckPaint(event, paint) {
    console.log(event);
    console.log(paint);
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
    if (JSON.stringify(this.unchangedMini) !== JSON.stringify(this.mini)) {
      this.doYouWantToSave();
    } else {
      this.closeModal();
    }
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
            this.miniatureService.updateMini(this.unchangedMini);
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

  createUpdateMini() {
    if (this.validate()) {
      if (this.isCreate) {
        this.mini.id = this.miniatureService.generateNewId();
        this.miniatureService.createMini(this.mini);
        this.showToast("You successfully created a mini");
      } else {
        this.miniatureService.updateMini(this.mini);
        this.showToast("You successfully updated a mini");
      }
    } else {
      return false;
    }
    this.closeModal();
  }

  onImageSelected(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.mini.imgUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  prepareColors() {
    setTimeout(() => {
			let elements = document.getElementsByClassName("alert-checkbox-label sc-ion-alert-md") as HTMLCollectionOf<HTMLElement>;
      if (!elements.length) {
				this.prepareColors();
			} else {
        for (let index = 0; index < elements.length; index++) {
          console.log("hi");
          elements[index].setAttribute("style", "border-right: 20px solid " + this.paints[index].color);
        }
      }
    }, 100);
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
  
    if (this.isCreate) {
      this.mini = <Miniature>{
        imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        id: -1,
        paints: []
      };
    }

    this.unchangedMini = Object.assign({}, this.mini);
  }

}
