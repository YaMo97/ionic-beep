import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { ChatService } from '../../providers/chat/chat.service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channelMessages: Observable<ChannelMessage[]>;
  channel: Channel;
  
  constructor(private chat: ChatService, private navCtrl: NavController, private navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.channel = this.navParams.get('channel');
    this.channelMessages = this.chat.getChannelChatRef(this.channel.$key);
  }

  sendMessage(content: string) {
    let channelMessage: ChannelMessage = {
      content
    }

    this.chat.sendChannelChatMessage(this.channel.$key, channelMessage);
  }


}
