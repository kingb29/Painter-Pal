import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Paint {
    id: number,
    name: string,
    color: string,
    brand: string,
    mini: string,
}

const COLLECTION_KEY = 'paints';

@Injectable({
  providedIn: 'root'
})
export class PaintService {

  constructor(private storage: Storage) {}

  addItem(item: Paint): Promise<any> {
    return this.storage.get(COLLECTION_KEY).then((items: Paint[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(COLLECTION_KEY, items);
      } else {
        return this.storage.set(COLLECTION_KEY, [item]);
      }
    });
  }
 
  // READ
  getItems(): Promise<Paint[]> {
    return this.storage.get(COLLECTION_KEY);
  }
 
  // UPDATE
  updateItem(item: Paint): Promise<any> {
    return this.storage.get(COLLECTION_KEY).then((items: Paint[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: Paint[] = [];
 
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
 
  clearData() {
    this.storage.clear();
  }
}
