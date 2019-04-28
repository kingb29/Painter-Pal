import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MiniFormComponent } from './mini-form/mini-form.component';
import { MiniatureService, Miniature } from 'src/app/_services/miniature.service';

@Component({
  selector: 'app-minis',
  templateUrl: './minis.component.html',
  styleUrls: ['./minis.component.scss'],
})
export class MinisComponent implements OnInit {

  minis: Miniature[];

  /*minis = [
    {
      name: 'My first mini',
      thumb: 'https://whc-cdn.games-workshop.com/wp-content/uploads/2017/02/Best-2016-10-Stardrake.jpg'
    },
    {
      name: 'My second mini',
      thumb: 'https://i.ebayimg.com/images/g/ftQAAOSwEetWAskt/s-l300.jpg'
    }
  ];*/

  constructor(private modalController: ModalController, private miniatureService: MiniatureService) {
    this.minis = this.miniatureService.getMinis();
  }

  ngOnInit() {
    this.minis = this.miniatureService.getMinis();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MiniFormComponent,
    });
    return await modal.present();
  }

}
