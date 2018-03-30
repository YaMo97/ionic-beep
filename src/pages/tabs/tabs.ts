import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tabColor: string;
  selectedIndex: number;

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;

  constructor() {

    this.tab1Root = 'InboxPage';
    this.tab2Root = 'ChannelPage';
    this.tab3Root = 'ProfilePage';
  }

  changeTabColor() {
    this.selectedIndex = this.tabRef.getIndex(this.tabRef.getSelected());

    switch (this.selectedIndex) {
      case 0: this.tabColor = 'primary';
      break;
      case 1: this.tabColor = 'secondary';
      break;
      case 2: this.tabColor = 'danger';
      break;
    }
  }
}
