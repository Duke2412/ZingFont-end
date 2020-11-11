import { Component, OnInit } from '@angular/core';
import {IArtist} from '../../interface/iartist';
import {ISongService} from '../../service/isong.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {Iuser} from '../../interface/iuser';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss']
})
export class CreateArtistComponent implements OnInit {
  user: Iuser = {
    userId:2,
    name:"admin"
  };
  artist: IArtist;
  artistFrom: FormGroup;
  loginRequest: Iloginrequest = null;

  constructor(private iSongService: ISongService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    this.user.userId = this.loginRequest.id;
  }

  ngOnInit(): void {
    this.artistFrom = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  summit(){
    this.artist = {
      ...this.artist,
      ...this.artistFrom.value
    }
    console.log(this.artist);
    this.iSongService.createArtist(this.artist).subscribe(next => this.router.navigateByUrl('/artist'));
  }
  get name() {
    return this.artistFrom.get('name');
  }
  checkform(): boolean {
    if (this.artistFrom.invalid ) {
      return true;
    }
  }
}
