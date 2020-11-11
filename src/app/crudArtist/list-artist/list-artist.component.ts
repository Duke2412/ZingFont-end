import { Component, OnInit } from '@angular/core';
import {IArtist} from '../../interface/iartist';
import {ISongService} from '../../service/isong.service';
import {Iuser} from '../../interface/iuser';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {
  artist: IArtist = {
    id: 0,
    name: ""
  }
  loginRequest: Iloginrequest;

  artists: IArtist[] = [];
  constructor(private iSongService: ISongService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
  }

  ngOnInit(): void {
    this.getAllArtist();
  }
  getAllArtist(){

    this.iSongService.getAllArtist().subscribe(p =>this.artists = p);
    return this.artists
  }
  onChanges() {
    this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
  }
  logOut(): void {
    sessionStorage.removeItem('user');
  }
}
