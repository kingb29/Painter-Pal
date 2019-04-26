import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialPage } from '../social/social.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  constructor(public navCtrl: NavController, private router: Router) { 
  
  
  }
  ngOnInit() {}


  public checkParams(){
    console.log("hello");
    var username = (<HTMLInputElement>document.getElementById("username")).value; // get data for username and password
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    if(username.length < 5 || password.length < 5){ // check data
      let elm = <HTMLElement>document.getElementById("hiddenMsg") // grabs hidden element
      elm.style.visibility = "visible"; // makes it visible
    }else{
      this.router.navigateByUrl('/social'); // if they pass the parameter check then send them to the social tab
    }
  }

  
}

