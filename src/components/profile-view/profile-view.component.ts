import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { Loading, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {

  userProfile: Profile;
  loadingSpinner: Loading;
  
  constructor(private loadingCtrl: LoadingController, private data: DataService, private auth: AuthService) {

    this.loadingSpinner = this.loadingCtrl.create({
      content: "Loading profile..."
    });
  }

  ngOnInit(): void {
    this.loadingSpinner.present();
    this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.data.getProfile(user).subscribe((profile) => {
        this.userProfile = <Profile>profile.payload.val();
        this.loadingSpinner.dismiss();
      })
    });
  }

}
