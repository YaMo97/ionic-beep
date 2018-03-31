import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { User } from 'firebase/app';
import { database } from "firebase";
import { Profile } from '../../models/profile/profile.interface';
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeMap";

import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>;
  profileList: AngularFireList<Profile>;

  constructor(private authService: AuthService, private database: AngularFireDatabase) {
  }

  searchUser(firstName: string) {
    const query = this.database.list<Profile>('/profiles', ref => ref.orderByChild('firstName').equalTo(firstName)).valueChanges();

    return query.take(1);
  }

  getAuthenticatedUserProfile() {
    return this.authService.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => {
        return this.database.object(`profiles/${authId}`).snapshotChanges().map(profile => ({ 
          $key: profile.key, 
          ...profile.payload.val()
        }))
      }).take(1);
  }

  getProfile(user:User) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);
 
    return this.profileObject.snapshotChanges().take(1);
  }

  async saveProfile(user: User, profile: Profile) {
    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    try {
      await this.profileObject.set(profile);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  setUserOnline(profile: Profile) {

    const ref = database().ref(`online-users/${profile.$key}`);

    try {
      const $key = profile.$key;
      delete profile.$key;
      ref.update({...profile});
      profile.$key = $key;
      ref.onDisconnect().remove();
    } catch (e) {
      console.error(e);
    }
  }

  getOnlineProfiles(): Observable<Profile[]> {
    return this.database.list(`online-users`).snapshotChanges()
      .map(profiles => {
        return profiles.map(profile => ({ $key: profile.key, ...profile.payload.val() }))
      });
    // return this.database.list<Profile>(`online-users`).valueChanges();
  }
}
