import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialPage } from './social.page';
import { PostModalComponent } from './social-feed/postmodal/postmodal.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { MyPostFormComponent } from './my-posts/my-post-form/my-post-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SocialPage }])
  ],
  declarations: [SocialPage, PostModalComponent, MyPostsComponent, MyPostFormComponent, SocialFeedComponent],
  entryComponents: [PostModalComponent, MyPostFormComponent]
})
export class SocialPageModule {}
