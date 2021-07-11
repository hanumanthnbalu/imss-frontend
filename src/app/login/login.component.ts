import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  userForm = this.fb.group({
    email: ['', Validators.required]
  });
  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.userForm.value)
      .subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
      });
  };
 


}
