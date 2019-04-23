import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Miniature {
  id: number,
  title: string,
  desc: string,
  brand: string,
  game: string,
  shared: boolean,
  modified: number
}

const COLLECTION_KEY = 'miniature';

@Injectable({
  providedIn: 'root'
})
export class MiniatureService {

  constructor(private storage: Storage) {}

  addItem(item: Miniature): Promise<any> {
    return this.storage.get(COLLECTION_KEY).then((items: Miniature[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(COLLECTION_KEY, items);
      } else {
        return this.storage.set(COLLECTION_KEY, [item]);
      }
    });
  }
 
  // READ
  getItems(): Promise<Miniature[]> {
    return this.storage.get(COLLECTION_KEY);
  }
 
  // UPDATE
  updateItem(item: Miniature): Promise<any> {
    return this.storage.get(COLLECTION_KEY).then((items: Miniature[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: Miniature[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
 
      return this.storage.set(COLLECTION_KEY, newItems);
    });
  }
 
  // DELETE
  deleteItem(id: number): Promise<Miniature> {
    return this.storage.get(COLLECTION_KEY).then((items: Miniature[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Miniature[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(COLLECTION_KEY, toKeep);
    });
  }
  clearData() {
    // DANGER WILL ROBINSON
    // refresh page - doesn't reflect on page until you refresh
    this.storage.clear();
  }
}
