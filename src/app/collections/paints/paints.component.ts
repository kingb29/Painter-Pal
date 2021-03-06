import { Component, OnInit } from '@angular/core';
import { PaintsFormComponent } from './paints-form/paints-form.component';
import {ModalController} from '@ionic/angular';
import { PaintService, Paint } from 'src/app/_services/paint.service';

@Component({
  selector: 'app-paints',
  templateUrl: './paints.component.html',
  styleUrls: ['./paints.component.scss'],
})
export class PaintsComponent implements OnInit {

  paints: Paint[];
  constructor(public modalController: ModalController, private paintService: PaintService) {
    this.paints = this.paintService.getPaints();
   }

  ngOnInit() {}


  async presentAddOrEditPaintModal(thisisCreate, thispaint) {
    var thistitle = (thisisCreate)? "Add Paint": "Edit Paint";
    var thisbutton = (thisisCreate)? "Create":"Save";
    var thispaint = (!thisisCreate)? thispaint:<Paint>{};
    const modal = await this.modalController.create({
      component: PaintsFormComponent,
      componentProps: {
        isCreate: thisisCreate,
        paint: thispaint,
        title: thistitle,
        button: thisbutton,
      }
    });
    return await modal.present();
  }
}




