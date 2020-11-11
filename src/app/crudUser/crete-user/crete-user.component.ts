import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IuserService} from '../../service/iuser.service';

@Component({
  selector: 'app-crete-user',
  templateUrl: './crete-user.component.html',
  styleUrls: ['./crete-user.component.scss']
})
export class CreteUserComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb: FormBuilder,
              private iUserService: IuserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  createUser(): void {
    const user = this.userForm.value;
    this.iUserService.createUser(user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  get nameUser() {
    return this.userForm.get('name');
  }
  get emailUser() {
    return this.userForm.get('email');
  }
  get passWordUser() {
    return this.userForm.get('password');
  }

}
