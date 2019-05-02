import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionsPage } from './collections.page';
import { MinisComponent } from './minis/minis.component';
import { PaintsComponent } from './paints/paints.component';
import { MiniFormComponent } from './minis/mini-form/mini-form.component';
import { PaintsFormComponent } from './paints/paints-form/paints-form.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CollectionsPage }])
  ],
  declarations: [CollectionsPage, MinisComponent, MiniFormComponent, PaintsComponent, PaintsFormComponent],
  entryComponents: [MiniFormComponent, PaintsFormComponent]
})
export class CollectionsPageModule {}
