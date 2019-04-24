import { Component } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: 'collections.page.html',
  styleUrls: ['collections.page.scss']
})
export class CollectionsPage {
  whichPage = 'minis';
 
  segmentChanged(event) {
    this.whichPage = event.detail.value;
  }
  
  constructor() {}
 

  // CLEAR ALL
  /*clearData() {
    this.storageService.clearData();
  }*/
}
