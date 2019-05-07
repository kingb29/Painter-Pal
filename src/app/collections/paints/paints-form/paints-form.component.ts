import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavParams } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-paints-form',
  templateUrl: './paints-form.component.html',
  styleUrls: ['./paints-form.component.scss'],
})
export class PaintsFormComponent implements OnInit {
  
  public color:String;
  public brand: String;
  public name = this.navParams.get('thisname');
  public mini: String;

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private navParams: NavParams) {
      this.name = this.navParams.get('name');
      this.mini = this.navParams.get('mini');
     }


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

  async exitmodal(){
    

    this.closeModal();
  }

  async setColor(color: String){
    this.color = color;
  }

  async setBrand(brand: String){
    this.brand = brand;
  }
  ngOnInit() {}

}
