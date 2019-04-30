import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MorePage } from './more.page';
import { PaintingtutorialsComponent } from './paintingtutorials/paintingtutorials.component';
import { HowComponent } from './how/how.component';
import { TipsComponent } from './tips/tips.component';
import { PaintingcoursesComponent } from './paintingcourses/paintingcourses.component';





@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MorePage }])
  ],
  declarations: [MorePage, PaintingtutorialsComponent,HowComponent,TipsComponent,PaintingcoursesComponent]
  
  


})
export class MorePageModule {}
