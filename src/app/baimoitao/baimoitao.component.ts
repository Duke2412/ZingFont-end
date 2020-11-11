import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ISong} from '../interface/isong';
import {ISongService} from '../service/isong.service';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {observable, Observable} from "rxjs";






@Component({
  selector: 'app-baimoitao',
  templateUrl: './baimoitao.component.html',
  styleUrls: ['./baimoitao.component.scss']
})
export class BaimoitaoComponent implements OnInit {
  songListDate6: ISong[] = [];

  currentList: number[] = [];

  @Output()
  changeSong = new EventEmitter<number>();

  constructor(
    private iSongService: ISongService,
    private cookie: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.getAllSong10();
  }

  getAllSong10(): ISong[] {
    this.iSongService.getAllSongByDate().subscribe(p => {
      for (let i = 0; i < 6; i++) {
        this.songListDate6.push(p[i]);
      }
    });
    return this.songListDate6;
  }

  getAllSongByDate() {
    this.currentList = [];
    this.iSongService.getAllSongByDate().subscribe(p => {
      p.forEach(index => {this.currentList.push(index.songId);})
    },err => {
      console.log(err)
    }, () => {
      console.log(JSON.parse((this.cookie.get('current-list'))));
    })
  }

  playSong(songId) {
    this.cookie.delete('current-song')
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list',JSON.stringify(this.currentList),10000);
    console.log(this.cookie.get('current-song'));
    this.getAllSongByDate()
    this.changeSong.emit();
  }
}
