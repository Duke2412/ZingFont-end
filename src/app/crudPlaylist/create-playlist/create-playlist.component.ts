import { Component, OnInit } from '@angular/core';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPlayList} from '../../interface/i-play-list';
import {Iuser} from '../../interface/iuser';
import {IplaylistService} from '../../service/iplaylist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {

  loginRequest: Iloginrequest = null;
  playlistForm: FormGroup;
  playlist: IPlayList = null;
  user: Iuser = {
    userId: 0
  }
  constructor(private fb: FormBuilder,
              private iPlaylistService: IplaylistService,
              private router: Router) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    this.user.userId = this.loginRequest.id;
  }

  ngOnInit(): void {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  get name() {
    return this.playlistForm.get('name');
  }
  submit(): void {
    this.playlist = this.playlistForm.value;
    this.playlist.user = this.user;
    console.log(this.playlist)
    this.iPlaylistService.createPlayList(this.playlist).subscribe(() => {
      }, error => {
      },
      () => this.router.navigateByUrl('/myPlaylist'))
  }
}
