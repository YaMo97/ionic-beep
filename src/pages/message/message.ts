import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/message/message.interface';
import { MESSAGE_LIST } from '../../mocks/messages/messages';
import { AuthService } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  selectedProfile: Profile;

  messageList: Message[];

  userId: string;

  constructor(private auth: AuthService, private navParams: NavParams) {
    this.messageList = MESSAGE_LIST;
  }

  ionViewWillLoad() {
    this.selectedProfile = this.navParams.get('profile');
    this.auth.getAuthenticatedUser()
      .subscribe(auth => this.userId = auth.uid);
  }

}
