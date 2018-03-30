import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { Channel } from '../../models/channel/channel.interface';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  channelList: Observable<Channel[]>;

  constructor(private chat: ChatService, private alertCtrl: AlertController) {
  }

  ionViewWillLoad() {
    // Get Channels
    this.getChannels()
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
  
  getChannels() {
    this.channelList = this.chat.getChannelListRef();
  }

}
