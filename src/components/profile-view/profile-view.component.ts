import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  private authUser: User;
  public userProfile: Profile;
  private loadingSpinner: Loading;

  @Output() existingProfile: EventEmitter<Profile>;
  
  constructor(private loadingCtrl: LoadingController, private data: DataService, private auth: AuthService) {

    this.existingProfile = new EventEmitter<Profile>();

    this.loadingSpinner = this.loadingCtrl.create({
      content: "Loading profile..."
    });
  }

  ngOnInit(): void {
    this.loadingSpinner.present();

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.userProfile = <Profile>profile;
      
      this.existingProfile.emit(this.userProfile);
      this.loadingSpinner.dismiss();
    });
    
  }

}
