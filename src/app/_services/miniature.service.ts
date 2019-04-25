import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Miniature {
  id: number,
  title: string,
  imgUrl: any,
  desc: string,
  brand: string,
  game: string,
  shared: false,
  modified: string
}


@Injectable({
  providedIn: 'root'
})
export class MiniatureService {

  minis: Miniature[];

  constructor(private storage: Storage) {
    this.minis = [];
  }

  createMini(item: Miniature) {
    console.log(item);
    this.minis.push(item);
  }
 
  // READ
  getMinis() {    
    return this.minis;
  }
 
  // UPDATE
  updateMini(mini) {

  }
 
  // DELETE
  deleteMini(mini) {

  }
  clearMinis() {
    this.minis = [];
  }
}
