import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../models/message/message.interface';
import { NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the LastMessageListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-last-message-list',
  templateUrl: 'last-message-list.component.html'
})
export class LastMessageListComponent implements OnInit {

  messageList$: Observable<Message[]>;

  constructor(private chat: ChatService, private navCtrl: NavController, private navParams: NavParams) {

  }

  ngOnInit() {
    this.messageList$ = this.chat.getLastMessagesForUser();
  }


  openChat(message: Message) {
    this.navCtrl.push('MessagePage', { 
      profile: {
        $key: message.userToId,
        firstName: message.userToProfile.firstName,
        lastName: message.userToProfile.lastName
      } 
    });
  }

}
