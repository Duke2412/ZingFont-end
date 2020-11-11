import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISong} from '../interface/isong';
import {ISongService} from '../service/isong.service';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-nghenhieunhat',
  templateUrl: './nghenhieunhat.component.html',
  styleUrls: ['./nghenhieunhat.component.scss']
})
export class NghenhieunhatComponent implements OnInit {
  songList6: ISong[] = [];
  currentList: number[] = [];

  @Output()
  changeSongNgheNhieu = new EventEmitter<number>();
  constructor(private iSongService: ISongService,
              private cookie: CookieService) {

  }

  ngOnInit(): void {
    this.getAllSong10();
  }

  getAllSong10(): ISong[] {
    this.iSongService.getAllSongByPlay().subscribe(p => {
      for (let i = 0; i < 6; i++) {
        this.songList6.push(p[i]);
      }
    });
    return this.songList6;
  }
  getAllSongByPlay() {
    this.currentList = [];
    this.iSongService.getAllSongByPlay().subscribe(p => {
      p.forEach(index => {
        this.currentList.push(index.songId);
      })
    }, err => {
      console.log(err)
    }, () => {

      console.log(JSON.parse((this.cookie.get('current-list'))));
    })
  }

  playSong(songId, event) {
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list', '/');
    this.cookie.set('current-list', JSON.stringify(this.currentList), 10000);
    console.log(this.cookie.get('current-song'));
    this.getAllSongByPlay()
    this.changeSongNgheNhieu.emit();
  }
}
