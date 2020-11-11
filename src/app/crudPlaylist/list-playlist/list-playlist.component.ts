import { Component, OnInit } from '@angular/core';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {IPlayList} from '../../interface/i-play-list';
import {IplaylistService} from '../../service/iplaylist.service';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent implements OnInit {

  loginRequest: Iloginrequest = null;
  playList: IPlayList[] = [];

  constructor(private iPlaylistService: IplaylistService) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));

  }

  ngOnInit(): void {
    this.getPlayList();

  }
  getPlayList(): IPlayList[] {
    this.iPlaylistService.getPlayListByUser(this.loginRequest.id).subscribe(pr => {
      this.playList = pr
    })
    return this.playList
  }
}
