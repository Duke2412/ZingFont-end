import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import {ISong} from '../interface/isong';
import {ISongService} from '../service/isong.service';
import {SearchSongsService} from '../service/search-songs.service';
import {CookieService} from 'ngx-cookie-service';
import {ShareEventService} from '../service/share-event.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  sub: Subscription;
  currentList: number[] = [];
  songs: ISong[] = [];
  name: string;
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private iSongService: ISongService,
    private searchSongsService: SearchSongsService,
    private cookie: CookieService,
    private shareEvent: ShareEventService
  ) {
    searchSongsService.changeEmitted$.subscribe(x =>{
      this.name = x;
      this.searchSongs()
    })
  }

  ngOnInit(): void {

  }

  searchSongs() {
    this.iSongService.searchSongByName(this.name).subscribe(p => {
      this.songs = p;
      if (this.songs.length == 0) {
        this.message = "Your Song Doesn't exist";
      } else this.message = null;
    });
  }
  playSong(songId) {
    this.cookie.delete('current-song','/');
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list', JSON.stringify(this.currentList),10000);
    // console.log(this.cookie.get('current-song'));
    this.shareEvent.emitChange('123');
  }
}

