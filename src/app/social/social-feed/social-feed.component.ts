import { Component, OnInit } from '@angular/core';
import { Post, SocialfeedService } from 'src/app/_services/socialfeed.service';
import { NavController, ModalController } from '@ionic/angular';
import { PostModalComponent } from './postmodal/postmodal.component';
import { SettingsComponent } from 'src/app/settings/settings.component';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss'],
})
export class SocialFeedComponent implements OnInit {

  posts: Post[];
  reset: Array<{title: string, author: string, likes, comments, img: string}>;
  constructor(public nav: NavController, private modalController: ModalController, private socialFeedService: SocialfeedService){ }

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

    ngOnInit() {
      this.initializeItems();
    }
}
