import { Injectable } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";

@Injectable()
export class ActionSheetService {
  constructor(private actionSheetCtrl: ActionSheetController,) {}
  async present(buttons: Array<any>) {
    buttons.push({
      text: 'Cancel',
      role: 'cancel',
    });
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: buttons
    });
    await actionSheet.present();
  }
}