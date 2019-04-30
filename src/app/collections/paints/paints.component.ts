import { Component, OnInit } from '@angular/core';
import { PaintsFormComponent } from './paints-form/paints-form.component';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.scss'],
})
export class PaintsComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  async presentPaintsModal() {
    const modal = await this.modalController.create({
      component: PaintsFormComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
