import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required]
  });
  ngOnInit(): void { }

  onSubmit() {
    this.userService.addDeveloper(this.userForm.value)
      .subscribe(res => {
        if (res) this.router.navigate(['/']);
      });
  }
}
