import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login-response/login-response.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  register(event: LoginResponse) {
    console.log(event);
    if(!event.error) {
      this.toastCtrl.create({
        message: `Account Created: ${event.result.email}`,
        duration: 3000
      }).present();
    }
    else {
      this.toastCtrl.create({
        message: `Account Not Created: ${event.error.message}`,
        duration: 3000
      }).present();
    }
    
  }

}
