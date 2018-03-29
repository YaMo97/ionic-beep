import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import "rxjs/add/operator/take";


@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>;

  constructor(private database: AngularFireDatabase) {
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
