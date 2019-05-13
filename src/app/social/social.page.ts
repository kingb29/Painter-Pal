import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from '../settings/settings.component';


@Component({
  selector: 'app-social',
  templateUrl: 'social.page.html',
  styleUrls: ['social.page.scss']
})
export class SocialPage {
  constructor(private modalController: ModalController){ }

  ngOnInit() {}

  whichPage = 'social-feed';
 
  segmentChanged(event) {
    this.whichPage = event.detail.value;
  }

  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }
}
