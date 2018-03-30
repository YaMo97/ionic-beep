import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Channel } from "../../models/channel/channel.interface";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {

  constructor(private database: AngularFireDatabase) {
  }

  addChannel(channelName: string) {
    this.database.list(`channel-names`).push({ name: channelName });
  }

  getChannelListRef(): Observable<Channel[]> {
    return this.database.list(`channel-names`).snapshotChanges().map(actions => {
      return actions.map(action => ( { $key: action.key, ...action.payload.val() }));
    });
  }
}
