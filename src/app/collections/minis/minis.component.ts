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

  constructor(private modalController: ModalController, private miniatureService: MiniatureService) {
    this.minis = this.miniatureService.getMinis();
  }
      

  ngOnInit() {}

  async presentAddOrEditMiniModal(thisisCreate, thismini) {
    var thistitle = (thisisCreate)? "Add New Miniature":"Edit Miniature";
    var thisbutton = (thisisCreate)? "Create":"Save";
    var thismini = (!thisisCreate)? thismini:<Miniature>{
      title: '',
      imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      id: -1
    };
    const modal = await this.modalController.create({
      component: MiniFormComponent,
      componentProps: {
        isCreate: thisisCreate,
        mini: thismini,
        title: thistitle,
        button: thisbutton,
      }
    });
    return await modal.present();
  }



}
