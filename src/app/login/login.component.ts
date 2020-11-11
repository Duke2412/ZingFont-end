import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IloginrequestService} from '../service/iloginrequest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Iloginrequest} from '../interface/Iloginrequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest: Iloginrequest = null;

  constructor(private formBuilder: FormBuilder,
              private userService: IloginrequestService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: [''],
      password: ['']
    });
  }

  findUser(): void {
    const login = this.loginForm.value;
    this.userService.getLoginRequest(login).subscribe(next => {
        this.loginRequest = next;
      }, error => {
        alert('ban chua co tai khoan hoac thong tin dang nhap sai');
      },
      () => {
        sessionStorage.setItem('user', JSON.stringify(this.loginRequest));
        this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
        console.log(this.loginRequest);
        if (this.loginRequest) {
          this.router.navigateByUrl('');
        }
      }
    );

  }
}
