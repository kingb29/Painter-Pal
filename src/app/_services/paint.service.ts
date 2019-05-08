import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Paint{
    id: number,
    name: string,
    color: string,
    brand: string,
    mini: String,
}

@Injectable({
    providedIn: 'root'
})

export class PaintService {

    paints: Paint[];
    paintIds: number;

    constructor(private storage: Storage){
        this.paints = [];
        this.paintIds = 4
    }

    createPaint(item: Paint){
        this.paints.push(item);
    }

    getPaints(){
        return this.paints;
    }

    generateNewId(){
        return this.paintIds++;
    }

    updatePaint(paint) {
        console.log(paint.id);
        const index = this.paints.findIndex((e) => e.id === paint.id);
    
        if (index === -1) {
            this.paints.push(paint);
        } else {
            this.paints[index] = paint;
        }
      }
}