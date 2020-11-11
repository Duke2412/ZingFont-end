import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Event, ParamMap, Router} from "@angular/router";
import {Iloginrequest} from "./interface/Iloginrequest";
import {ISong} from './interface/isong';
import {CookieService} from "ngx-cookie-service";
import {ShareEventService} from "./service/share-event.service";
import {SongControllerService} from "./service/song-controller.service";
import {Observable} from "rxjs";
import {SearchSongsService} from './service/search-songs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  event: any;
  playing: boolean = true;

  title = 'Zing-Front-End';
  loginRequest: Iloginrequest;
  currentSong: string;

  constructor(
    private router: ActivatedRoute,
    private cookie: CookieService,
    private shareEvent: ShareEventService,
    private songController: SongControllerService,
    private searchSongsService: SearchSongsService
  ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    // console.log(this.loginRequest.roles[0])
    shareEvent.changeEmitted$.subscribe(x => this.changes())
  }

  ngOnInit(): void {
  }
  onChanges() {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
  }

  changes() {
    const newSong = this.cookie.get('current-song');
    // console.log(newSong);
    if(this.currentSong != newSong) {
      this.playing = false;
      this.currentSong = newSong;
      this.playing = true;
      this.songController.emitChange(this.currentSong);
    }
  }

  logOut(): void {
    sessionStorage.removeItem("user")
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")))
  }

  searchSongs(search) {
    this.searchSongsService.emitChange(search);
  }

}
