import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  developers = [];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getDevelopers();
  }

  getDevelopers(): void {
    this.userService.getDevelopers()
      .subscribe(res => this.developers = res);
  }

}
