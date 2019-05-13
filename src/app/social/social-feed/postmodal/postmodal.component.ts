import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.scss'],
})
export class PostModalComponent implements OnInit {

  public post;

  constructor(private navParams: NavParams, private modCtrl: ModalController) { 
    this.post = this.navParams.get('post');
  }

  ngOnInit() {}

  dismissModal(){
    this.modCtrl.dismiss();
  }

}
