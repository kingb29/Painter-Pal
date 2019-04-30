import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  public checkParams(){
    var username = (<HTMLInputElement>document.getElementById("username")).value; // get data for username and password
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    if(username.length < 5 || password.length < 5){ // check data
      let elm = <HTMLElement>document.getElementById("hiddenMsg") // grabs hidden element
      elm.style.visibility = "visible"; // makes it visible
    }else{
      this.router.navigateByUrl(''); // if they pass the parameter check then send them to the social tab
    }
  }

}
