import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated: Boolean = false;
  userInfo;
  private authListenerSubs: Subscription;
  private authDetailListenerSubs: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const { isAuthenticated, user } = this.userService.getIsAuth();
    this.userIsAuthenticated = isAuthenticated;
    this.userInfo = user;
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  logout() {
    this.userService.logout()
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
