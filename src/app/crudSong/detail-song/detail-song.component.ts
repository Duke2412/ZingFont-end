import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';
import {CookieService} from 'ngx-cookie-service';
import {ShareEventService} from '../../service/share-event.service';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {
  song: ISong;
  constructor(
    private iSongService: ISongService,
    private activatedRoute: ActivatedRoute,
    private cookie: CookieService,
    private shareEvent: ShareEventService
  ) { }

  ngOnInit(): void {
    const id = + this.activatedRoute.snapshot.paramMap.get('id');
    this.getSong(id);
  }

  getSong(id) {
    this.iSongService.getSongByID(id).subscribe(next => this.song = next);
  }

  playSong(songId) {
    this.cookie.delete('current-song')
    this.cookie.set('current-song', `${songId}`,10000);
    this.shareEvent.emitChange('123');
  }
}
