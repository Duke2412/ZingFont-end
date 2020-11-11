import { Component, OnInit } from '@angular/core';
import {PlaylistSongService} from '../service/playlist-song.service';
import {ISong} from '../interface/isong';
import {IPlaylistSong} from '../interface/iplaylistsong';
import {ActivatedRoute, Router} from '@angular/router';
import {Iloginrequest} from '../interface/Iloginrequest';
import {IplaylistService} from '../service/iplaylist.service';
import {IPlayList} from '../interface/i-play-list';
import {CookieService} from 'ngx-cookie-service';
import {ShareEventService} from '../service/share-event.service';

@Component({
  selector: 'app-songbyplaylist',
  templateUrl: './songbyplaylist.component.html',
  styleUrls: ['./songbyplaylist.component.scss']
})
export class SongbyplaylistComponent implements OnInit {

  id: number;
  songs: ISong[] = [];
  iPlaylistSongs: IPlaylistSong[];
  loginRequest: Iloginrequest = null;
  playlist: IPlayList;
  currentList: number[] = [];

  constructor(
    private playlistSongService: PlaylistSongService,
    private activatedRoute: ActivatedRoute,
    private getPlaylist: IplaylistService,
    private router: Router,
    private cookie: CookieService,
    private shareEvent: ShareEventService
  ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem('user')));
    // console.log(this.loginRequest.id)
  }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getAllSongByPlayList(this.id);
    this.getPlaylist.getPlayListById(this.id).subscribe(next =>{
      this.playlist = next;
      console.log(this.playlist.user.userId)
    })
    // console.log(this.iPlaylistSongs)
  }

  getAllSongByPlayList(id: number) {
    this.playlistSongService.getPlayListSong(id).subscribe(p => {
      this.iPlaylistSongs = p;
      }, error => {},() => {
      this.iPlaylistSongs.forEach( item => {
        this.songs.push(item.song);
      })
        this.songs.forEach(index => {this.currentList.push(index.songId)});
    })
  }

  delete(song){
    let playlistSongId = 0;
    this.iPlaylistSongs.forEach(item => {
      if(song == item.song) {
        playlistSongId = item.id;
      }
    })
    this.playlistSongService.deletePlaylistSong(playlistSongId).subscribe(() => {
      this.songs = [];
      this.getAllSongByPlayList(this.id)
      });
  }

  playSong(songId) {
    console.log(this.currentList);
    this.cookie.delete('current-song','/');
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list',JSON.stringify(this.currentList),10000);
    console.log(this.cookie.get('current-song'));
    this
    this.shareEvent.emitChange('123');
  }

}
