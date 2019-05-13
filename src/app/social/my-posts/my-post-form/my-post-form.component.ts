import { Component, OnInit } from '@angular/core';
import { SocialfeedService, Post } from 'src/app/_services/socialfeed.service';
import { ModalController, AlertController, ToastController, NavParams } from '@ionic/angular';
import { Miniature, MiniatureService } from 'src/app/_services/miniature.service';

@Component({
  selector: 'app-my-post-form',
  templateUrl: './my-post-form.component.html',
  styleUrls: ['./my-post-form.component.scss'],
})
export class MyPostFormComponent implements OnInit {

  public post = this.navParams.get('post');
  unchangedPost: Post;
  public isCreate = this.navParams.get('isCreate');
  public title = this.navParams.get('title');
  public button = this.navParams.get('button');
  minis: Miniature[];

  constructor(private socialFeedService: SocialfeedService, 
    private miniatureService: MiniatureService,
    private modalController: ModalController, 
    private alertController: AlertController,
    private toastController: ToastController,
    private navParams: NavParams) {
      this.isCreate = this.navParams.get('isCreate');
      this.title = this.navParams.get('title');
      this.button = this.navParams.get('button');
    }

  selectMini(mini) {
    this.post.mini = mini;
    this.post.title = mini.title;
  }

  validate() {
    return this.post.title !== undefined;
  }

  checkIfPostIsDifferent() {
    if (JSON.stringify(this.unchangedPost) !== JSON.stringify(this.post)) {
      this.doYouWantToSave();
    } else {
      this.closeModal();
    }
  }

  createOrUpdatePost(post) {
    if (this.validate()) {
      if (this.isCreate) {
        this.socialFeedService.createPost(post);
      } else {
        this.socialFeedService.updatePost(post);
      }
        this.closeModal();
    } else {
      return false;
    }
  }

  async doYouWantToSave() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel',
      message: 'You have an unsaved post. Do you want to save it?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.createOrUpdatePost(this.post);
            if (this.isCreate) {
              this.showToast("You successfully created a post");
            } else {
              this.showToast("You successfully updated a post");
            }
            this.closeModal();
          }
        }, {
          text: 'No',
          handler: () => {
            console.log("hi");
            this.createOrUpdatePost(this.unchangedPost);
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAddOrEditPostModal(thisisCreate, thispost) {
    var thistitle = (thisisCreate)? "Create New Post":"Edit Post";
    var thisbutton = (thisisCreate)? "Create":"Save";
    var thispost = (!thisisCreate)? thispost:<Post>{};
    const modal = await this.modalController.create({
      component: MyPostFormComponent,
      componentProps: {
        isCreate: thisisCreate,
        post: thispost,
        title: thistitle,
        button: thisbutton,
      }
    });
    return await modal.present();
  }

  async doYouWantToDelete() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.socialFeedService.deletePost(this.post);
            this.showToast("You successfully deleted a post");
            this.closeModal();
          }
        }, {
          text: 'No',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      showCloseButton: true,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    if (this.isCreate) {
      this.post = <Post>{
        id: this.socialFeedService.generateNewId(),
        author: "testuser",
        likes: 0,
        comments: [],
      };
    } else {
      this.post = this.navParams.get('post');
    }

    this.minis = this.miniatureService.getMinis();
    this.unchangedPost = Object.assign({}, this.post);
  }

}
