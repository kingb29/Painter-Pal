import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Paint } from './paint.service';

export interface Miniature {
  id: number,
  title: string,
  imgUrl: any,
  desc: string,
  brand: string,
  game: string,
  paints: Paint[],
}

@Injectable({
  providedIn: 'root'
})
export class MiniatureService {

  minis: Miniature[];

  miniIds: number;

  constructor(private storage: Storage) {
    this.minis = [];
    this.minis.push(
      <Miniature> {
      title: 'This cool guy',
      imgUrl: 'https://whc-cdn.games-workshop.com/wp-content/uploads/2017/02/Best-2016-10-Stardrake.jpg',
      game: 'Warhammer',
      brand: 'Games Workshop',
      id: 6,
      paints: []
    });
    this.miniIds = 2;
  }

  createMini(item: Miniature) {
    this.minis.push(item);
  }
 
  // READ
  getMinis() {    
    return this.minis;
  }

  generateNewId() {
    return this.miniIds++;
  }
 
  // UPDATE
  updateMini(mini) {
    const index = this.minis.findIndex((e) => e.id === mini.id);

    if (index === -1) {
        this.minis.push(mini);
    } else {
        this.minis[index] = mini;
    }
  }
 
  // DELETE
  deleteMini(mini) {
    const index = this.minis.findIndex((e) => e.id === mini.id);
    if (index === -1) {
      console.log("no id found");
    } else {
        this.minis.splice(index, 1);
    }
  }

  doesMiniHaveThisPaint(paint, mini) {
    return (mini.paints.findIndex((e) => e.id === paint.id) !== -1);
  }

  clearMinis() {
    this.minis = [];
  }

  checkIfShared(mini) {
    console.log(mini);
    return (mini !== undefined && mini.shared == true);
  }
}
