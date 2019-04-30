import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-shopping',
  templateUrl: 'shopping.page.html',
  styleUrls: ['shopping.page.scss']
})
export class ShoppingPage {

  constructor(private modalController: ModalController) {}
  
  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }
}
