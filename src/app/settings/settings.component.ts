import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  Notifications: boolean;

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  LogoutClick() {
    this.router.navigateByUrl('login');
    this.close();
  }

}
