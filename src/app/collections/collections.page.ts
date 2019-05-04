import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MiniFormComponent } from './minis/mini-form/mini-form.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-collections',
  templateUrl: 'collections.page.html',
  styleUrls: ['collections.page.scss']
})
export class CollectionsPage {
  whichPage = 'minis';
 
  segmentChanged(event) {
    this.whichPage = event.detail.value;
  }
  
  constructor(private modalController: ModalController) {}

  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }
}
