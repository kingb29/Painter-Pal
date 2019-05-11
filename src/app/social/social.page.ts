import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { PostModalComponent } from './postmodal/postmodal.component';
import { Post, SocialfeedService } from './../_services/socialfeed.service';
import { SettingsComponent } from '../settings/settings.component';


@Component({
  selector: 'app-social',
  templateUrl: 'social.page.html',
  styleUrls: ['social.page.scss']
})
export class SocialPage {
  posts: Post[];
  reset: Array<{title: string, author: string, likes, comments, img: string}>;
  constructor(public nav: NavController, private modalController: ModalController, private socialFeedService: SocialfeedService){ }

  ngOnInit() {
    this.initializeItems();
  }

  blur(event) {
    var target = event.target;
    target.blur();
  }

  search(event){
    
    const findTerm = event.srcElement.value;
    if(!findTerm){
      this.initializeItems();
    } else {
      this.posts = this.socialFeedService.searchByTerm(findTerm);
    }

    /*this.postArr = this.postArr.filter(currentPost => {
      if(currentPost.title && findTerm || currentPost.author && findTerm) {
        if(currentPost.title.toLowerCase().indexOf(findTerm.toLowerCase()) > -1) {
          return true;
        } else if(currentPost.author.toLowerCase().indexOf(findTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });*/
  }

  initializeItems() {
    this.posts = this.socialFeedService.getPosts();
  }

  async openModal(thisPost) {
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: {
        post: thisPost,
      }
    });
    return await modal.present();
  }

  async presentSettingsModal() {
    const modal = await this.modalController.create({
      component: SettingsComponent,
    });
    return await modal.present();
  }

  
}
