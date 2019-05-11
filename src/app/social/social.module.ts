import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialPage } from './social.page';
import { PostModalComponent } from './postmodal/postmodal.component';
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SocialPage }])
  ],
  declarations: [SocialPage, PostModalComponent, PostFormComponent],
  entryComponents: [PostModalComponent]
})
export class SocialPageModule {}
