import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-paints-form',
  templateUrl: './paints-form.component.html',
  styleUrls: ['./paints-form.component.scss'],
})
export class PaintsFormComponent implements OnInit {
  
  public color = null;
  public brand = null;

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,) { }


  closeModal() {
    this.modalController.dismiss();
  }

  async doYouWantToSave() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'Are you sure that you want to canel?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.closeModal();
          }
        }, {
          text: 'No',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

  async setColor(color){
    this.color = color;
  }

  async setBrand(brand){
    this.brand = brand;
  }
  ngOnInit() {}

}
