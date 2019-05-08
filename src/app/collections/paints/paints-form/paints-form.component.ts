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
  
  public isCreate = this.navParams.get('thisisCreate')
  public color:String;
  public brand: String;
  public name = this.navParams.get('thisname');
  public mini = this.navParams.get('thismininame')

  constructor(
    private modalController: ModalController, 
    private alertController: AlertController,
    private paintService: PaintService,
    private navParams: NavParams) {
      this.isCreate = this.navParams.get('isCreate');
      this.name = this.navParams.get('name');
      this.mini = this.navParams.get('mini');
      if (this.isCreate) {
        this.mini = <Paint>{
          color: this.color,
          brand: this.brand,
          name: this.name,
          mini: this.mini,

        };
      }
    }


  closeModal() {
    this.modalController.dismiss();
  }

  createPaint() {
    if (this.isCreate) {
      this.name.id = this.paintService.generateNewId();
      console.log(this.name.id);
      this.paintService.createPaint(this.name);
    } else {
      this.paintService.updatePaint(this.name);
    }
    this.closeModal();
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
    this.createPaint();
  }

  async setColor(color: String){
    this.color = color;
  }

  async setBrand(brand: String){
    this.brand = brand;
  }
  ngOnInit() {}

}
