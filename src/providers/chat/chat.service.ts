import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/mergeMap";
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';

import { Channel } from "../../models/channel/channel.interface";
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { Message } from '../../models/message/message.interface';


@Injectable()
export class ChatService {

  constructor(private database: AngularFireDatabase, private auth: AuthService) {
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

  getChats(userTwoId: string) {
    return this.auth.getAuthenticatedUser()
      .map(auth => auth.uid)
      .mergeMap(uid => {
        return this.database.list<string>(`/user-messages/${uid}/${userTwoId}`) 
          .snapshotChanges()
          .map(messageKeys => {
            return messageKeys.map(messageKey => ({ $key: messageKey.key, ...messageKey.payload.val() }))
        });
      }).mergeMap(chats => {
        return Observable.forkJoin(
          chats.map(chat => this.database.object(`/messages/${chat.$key}`).valueChanges().first()),
          (...vals: Message[]) => {
            return vals;
          }
        )
      });
  }
}
