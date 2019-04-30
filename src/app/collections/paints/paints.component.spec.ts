import { CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PaintsFormComponent } from './paints-form/paints-form.component';
import { PaintsComponent } from './paints.component';
import { ModalController } from '@ionic/angular';

describe('PaintsComponent', () => {
  let component: PaintsComponent;
  let fixture: ComponentFixture<PaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'modal-example',
  templateUrl: 'modal-example.html',
  styleUrls: ['./modal-example.css']
})
export class ModalExample {
  constructor(public modalController: ModalController) {}

  async addColor() {
    const modal = await this.modalController.create({
      component: PaintsFormComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
