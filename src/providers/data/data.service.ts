import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import "rxjs/add/operator/take";
import "rxjs/add/operator/mergeMap";

import { AuthService } from '../auth/auth.service';


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
      .mergeMap(authId => this.database.object(`profiles/${authId}`).valueChanges())
      .take(1);
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

}
