import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Channel } from "../../models/channel/channel.interface";
import { Observable } from 'rxjs/Observable';
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { Message } from '../../models/message/message.interface';


@Injectable()
export class ChatService {

  constructor(private database: AngularFireDatabase) {
  }

  addChannel(channelName: string) {
    this.database.list(`channel-names`).push({ name: channelName });
  }

  getChannelListRef(): Observable<Channel[]> {
    return this.database.list(`channel-names`).snapshotChanges().map(channels => {
      return channels.map(channel => ( { $key: channel.key, ...channel.payload.val() }));
    });
  }

  getChannelChatRef(channelKey: string): Observable<ChannelMessage[]> {
    return this.database.list(`channels/${channelKey}`).valueChanges();
  }

  async sendChannelChatMessage(channelKey: string, message: ChannelMessage) {
    await this.database.list(`channels/${channelKey}`).push(message);
  }

  async sendChat(message: Message) {
    await this.database.list(`/messages/`).push(message);
  }
}
