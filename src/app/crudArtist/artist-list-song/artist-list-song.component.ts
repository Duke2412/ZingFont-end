import {Component, OnInit} from '@angular/core';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IArtist} from '../../interface/iartist';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {CookieService} from 'ngx-cookie-service';
import {ShareEventService} from '../../service/share-event.service';

@Component({
  selector: 'app-artist-list-song',
  templateUrl: './artist-list-song.component.html',
  styleUrls: ['./artist-list-song.component.scss']
})
export class ArtistListSongComponent implements OnInit {
  songs: ISong[] = [];
  artist: IArtist = {
    id: 0,
    name: ""
  };
  currentList: number[] = [];
  loginRequest: Iloginrequest;

  constructor(private iSongService: ISongService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cookie: CookieService,
              private shareEvent: ShareEventService
  ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
  }

  ngOnInit(): void {
    this.getAllSongByArtist();
  }

  getAllSongByArtist() {
    this.artist.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.iSongService.getArtistAllSong(this.artist.id).subscribe(p => {
      this.songs = p;
      p.forEach(index => {this.currentList.push(index.songId)})
      // console.log(this.currentList)
    }, err => {
      console.log(err)
    }, () => {

      // console.log(JSON.parse((this.cookie.get('current-list'))));
    });
    return this.songs;
  }

  playSong(songId) {
    this.cookie.delete('current-song','/');
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list',JSON.stringify(this.currentList),10000);
    // console.log(this.cookie.get('current-song'));
    this.getAllSongByArtist();
    this.shareEvent.emitChange('123');
  }
}
