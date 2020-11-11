import {Component, OnInit} from '@angular/core';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {Iuser} from '../../interface/iuser';


@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  user: Iuser = {
    userId: 2
  };

  loginRequest: Iloginrequest = null;
  songs: ISong[] = [];
  constructor( private iSongService: ISongService) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
  }

  ngOnInit(): void {
    this.getListSongs();
  }
  getListSongs(): ISong[] {
    this.user.userId = this.loginRequest.id;
    this.iSongService.getAllSongByUser(this.user.userId).subscribe(p => this.songs = p);
    console.log(this.songs);
    return this.songs;
  }
}
