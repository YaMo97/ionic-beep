import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data/data.service';
import { Profile } from '../../models/profile/profile.interface';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-online-users',
  templateUrl: 'online-users.component.html'
})
export class OnlineUsersComponent implements OnInit {

  onlineProfilesList: Observable<Profile[]>;

  constructor(private data: DataService, private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.setUserOnline();
    this.onlineProfilesList = this.data.getOnlineProfiles();
  }

  setUserOnline() {
    // Get the authentcated user
    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      // Call to a service that sets the user online within firebase
      this.data.setUserOnline((profile as Profile));
    }); 
  }

  openChat(profile: Profile) {
    this.navCtrl.push('MessagePage', { profile });
  }
}
