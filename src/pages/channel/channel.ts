import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';

/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  constructor(private chat: ChatService, private alertCtrl: AlertController) {
  }

  showAddChannelDialog() {
    this.alertCtrl.create({
      title:"Channel Name",
      inputs: [{
        name: "channelName"
      }],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: 'Add',
          handler: data => {
            this.chat.addChannel(data.channelName);
          }
        }
      ]
    }).present();
  }
  

}
