import {Component, OnInit} from '@angular/core';
import {ISong} from '../interface/isong';
import {ISongService} from '../service/isong.service';
import {IPlayList} from '../interface/i-play-list';
import {Iloginrequest} from '../interface/Iloginrequest';
import {IplaylistService} from '../service/iplaylist.service';
import {IPlaylistSong} from '../interface/iplaylistsong';
import {PlaylistSongService} from '../service/playlist-song.service';
import {CookieService} from 'ngx-cookie-service';
import {ShareEventService} from '../service/share-event.service';


@Component({
  selector: 'app-top30',
  templateUrl: './top30.component.html',
  styleUrls: ['./top30.component.scss']
})
export class Top30Component implements OnInit {

  songList30: ISong[] = [];
  playList: IPlayList[] = [];
  loginRequest: Iloginrequest = null;
  currentList: number[] = [];
  playlistSong: IPlaylistSong = {
    playlist: null,
    song: null
  }

  constructor(
    private iSongService: ISongService,
    private iPlaylistService: IplaylistService,
    private playlistSongService: PlaylistSongService,
    private cookie: CookieService,
    private shareEvent: ShareEventService
  ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
  }

  ngOnInit(): void {
    this.getAllSong30();
    this.getPlayList();
  }

  getAllSong30(): ISong[] {
    this.iSongService.getAllSongByPlay().subscribe(p => {
      if (p.length < 30) {
        for (let i = 0; i < p.length; i++) {
          this.songList30.push(p[i]);
        }
      } else {
        for (let i = 0; i < 30; i++) {
          this.songList30.push(p[i]);
        }
      }
      p.forEach(index => {this.currentList.push(index.songId)})
    },err => {
      console.log(err)
    }, () => {
      // console.log(JSON.parse((this.cookie.get('current-list'))));
    });
    return this.songList30;
  }

  getPlayList(): IPlayList[] {
    this.iPlaylistService.getPlayListByUser(this.loginRequest.id).subscribe(pr => {
      this.playList = pr;
    });
    return this.playList;
  }

  addPlaylistSong(song, playlist) {
    console.log(playlist);
    this.playlistSong.playlist = playlist;
    this.playlistSong.song = song;
    console.log(this.playlistSong);
    this.playlistSongService.addPlaylistSong(this.playlistSong).subscribe(() =>
      console.log('up')
    );
  }

  playSong(songId) {
    this.cookie.delete('current-song','/');
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list',JSON.stringify(this.currentList),10000);
    this.shareEvent.emitChange('123');
  }
}
