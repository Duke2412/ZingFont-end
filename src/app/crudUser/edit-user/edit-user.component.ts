import { Component, OnInit } from '@angular/core';
import {Iuser} from '../../interface/iuser';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {Router} from '@angular/router';
import {IuserService} from '../../service/iuser.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: Iuser = null;
  userForm: FormGroup;
  loginRequest: Iloginrequest;


  constructor(private iUserService: IuserService,
              private fb: FormBuilder,
              private router: Router, ) { }

  ngOnInit(): void {
    this.loginRequest = JSON.parse((sessionStorage.getItem('rbnbuser')));
    console.log(this.loginRequest);
    this.getUserById(this.loginRequest.id);
    this.userForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  getUserById(id: number): void {
    this.iUserService.getUserById(id).subscribe(pr => {
      this.user = pr;
      console.log(pr);
      console.log(this.user);

    });

  }
  update(): void {
    const user = this.userForm.value;
    this.iUserService.updateUser(this.user.userId, user).subscribe(() => {
      this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
