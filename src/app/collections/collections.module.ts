import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionsPage } from './collections.page';
import { MinisComponent } from './minis/minis.component';
import { PaintsComponent } from './paints/paints.component';
import { MiniFormComponent } from './minis/mini-form/mini-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: CollectionsPage }])
  ],
  declarations: [CollectionsPage, MinisComponent, MiniFormComponent, PaintsComponent],
  entryComponents: [MiniFormComponent]
})
export class CollectionsPageModule {}
