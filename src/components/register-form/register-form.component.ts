import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../providers/auth/auth.service';

import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login-response/login-response.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  account = {} as Account;

  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth: AuthService) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register() {
    const registerResponse = await this.auth.createUserWithEmailAndPassword(this.account);
    
    this.registerStatus.emit(registerResponse);
  }

}
