import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'imss-frontend';
  constructor(private userService: UserService) { }
  userIsAuthenticated: Boolean = false;
  userInfo;
  private authListenerSubs: Subscription;
  private authDetailListenerSubs: Subscription;
  ngOnInit() {
    this.userService.autoAuthUser();
    const { isAuthenticated, user } = this.userService.getIsAuth();
    this.userIsAuthenticated = isAuthenticated;
    this.userInfo = user;
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userService
      .getAuthDetailInfo()
      .subscribe((user) => {
        this.userInfo = user;
      });
  }
  logout() {
    this.userService.logout()
  }
}
