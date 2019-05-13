import { Component, OnInit } from '@angular/core';
import { Post, SocialfeedService } from 'src/app/_services/socialfeed.service';
import { ModalController } from '@ionic/angular';
import { MyPostFormComponent } from './my-post-form/my-post-form.component';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {

  posts: Post[];

  constructor(private socialFeedService: SocialfeedService, 
    private modalController: ModalController) {
      this.posts = this.socialFeedService.getMyPosts();
    }

  async presentAddOrEditPostModal(thisisCreate, thispost) {
    var thistitle = (thisisCreate)? "Create New Post":"Edit Post";
    var thisbutton = (thisisCreate)? "Create":"Save";

    const modal = await this.modalController.create({
      component: MyPostFormComponent,
      componentProps: {
        isCreate: thisisCreate,
        post: thispost,
        title: thistitle,
        button: thisbutton,
      }
    });
    modal.onDidDismiss()
      .then(() => {
        this.posts = this.socialFeedService.getMyPosts();
    });
    return await modal.present();
  }

  ngOnInit() {
    this.posts = this.socialFeedService.getMyPosts();
  }

}
