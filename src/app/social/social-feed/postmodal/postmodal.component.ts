import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.component.html',
  styleUrls: ['./postmodal.component.scss'],
})
export class PostModalComponent implements OnInit {

  public post;
  public isenabled: boolean = true;
  public inputBox: boolean = false;
  public inputValue: string;

  constructor(private navParams: NavParams, private modCtrl: ModalController) { 
    this.post = this.navParams.get('post');
  }

  ngOnInit() {}

  dismissModal(){
    this.modCtrl.dismiss();
  }

  upLikes(){
    this.post.likes = this.post.likes  + 1;
    this.isenabled = false;
  }

  showInput(){
    if(this.inputBox == false){
      this.inputBox = true;
    }
    else{
      this.inputBox = false;
    }
  }

  makePost(){
    this.inputBox = false;
    this.post.comments.push(this.inputValue);
    this.inputValue = "";
  }

}
