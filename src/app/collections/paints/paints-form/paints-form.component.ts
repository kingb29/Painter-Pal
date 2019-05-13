import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Paint, PaintService } from 'src/app/_services/paint.service'

@Component({
  selector: 'app-paints-form',
  templateUrl: './paints-form.component.html',
  styleUrls: ['./paints-form.component.scss'],
})

export class PaintsFormComponent implements OnInit {
  
  public isCreate = this.navParams.get('thisisCreate');
  public paint: Paint;
  public colors: string[];
  unchangedPaint: Paint;

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private paintService: PaintService,
    private navParams: NavParams) {
      this.isCreate = this.navParams.get('isCreate');
      if (this.isCreate) {
        this.paint = <Paint>{};
      } else {
        this.paint = this.navParams.get('thispaint');
      }
      this.colors = this.paintService.colors;
    }


  closeModal() {
    this.modalController.dismiss();
  }

  savePaint() {
    if(this.paint.name !== undefined && this.paint.color !== undefined){
      this.createOrUpdatePaint(this.paint);
      this.showToast("You successfully updated a paint");
    }else{
      let elm = <HTMLElement>document.getElementById("hiddenMsg") // grabs hidden element
      elm.style.visibility = "visible"; // makes it visible
    }
  }

  createOrUpdatePaint(paint) {
    if (this.isCreate) {
      this.paint.id = this.paintService.generateNewId();
      this.paintService.createPaint(paint);
    } else {
      this.paintService.updatePaint(paint);
    }
    this.closeModal();
  }

  checkIfPaintIsDifferent() {
    if (JSON.stringify(this.unchangedPaint) !== JSON.stringify(this.paint)) {
      this.doYouWantToSave();
    } else {
      this.closeModal();
    }
  }

  async doYouWantToSave() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'You have an unsaved paint. Do you want to save it?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.createOrUpdatePaint(this.paint);
            if (this.isCreate) {
              this.showToast("You successfully created a paint");
            } else {
              this.showToast("You successfully updated a paint");
            }
            this.closeModal();
          }
        }, {
          text: 'No',
          handler: () => {
            this.createOrUpdatePaint(this.unchangedPaint);
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
      message: 'Are you sure you want to delete this paint?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.paintService.deletePaint(this.paint);
            this.showToast("You successfully deleted a paint");
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

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
  }

  async setColor(color: string){
    this.paint.color = color;
  }

  async setBrand(brand: string){
    this.paint.brand = brand;
  }
  ngOnInit() {
    this.unchangedPaint = Object.assign({}, this.paint);
  }


}
