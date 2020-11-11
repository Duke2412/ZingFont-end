import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISong} from '../interface/isong';
import {ISongService} from '../service/isong.service';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-likenhieunhat10bai',
  templateUrl: './likenhieunhat10bai.component.html',
  styleUrls: ['./likenhieunhat10bai.component.scss']
})
export class Likenhieunhat10baiComponent implements OnInit {
  songListLike6: ISong[] = [];
  songListLike30: ISong[] = [];
  currentList: number[] = [];

  @Output()
  changeSongLike = new EventEmitter<number>();

  constructor(private iSongService: ISongService,
              private cookie: CookieService,) {
  }

  ngOnInit(): void {
    this.getAllSong10();
  }

  getAllSong10(): ISong[] {
    this.iSongService.getAllSongByLikes().subscribe(p => {
      for (let i = 0; i < 6; i++) {
        this.songListLike6.push(p[i]);
      }
    });
    return this.songListLike6;
  }

  getAllSong30(): ISong[] {
    this.iSongService.getAllSongByLikes().subscribe(p => {
      for (let i = 0; i < 30; i++) {
        this.songListLike30.push(p[i]);
      }
    });
    return this.songListLike30;
  }
  getAllSongByLike() {
    this.currentList = [];
    this.iSongService.getAllSongByLikes().subscribe(p => {
      p.forEach(index => {this.currentList.push(index.songId);})
    },err => {
      console.log(err)
    }, () => {

      console.log(JSON.parse((this.cookie.get('current-list'))));
    })
  }
  playSong(songId, event) {
    this.cookie.set('current-song', `${songId}`,10000);
    this.cookie.delete('current-list','/');
    this.cookie.set('current-list',JSON.stringify(this.currentList),10000);
    console.log(this.cookie.get('current-song'));
    this.getAllSongByLike()
    this.changeSongLike.emit();
  }
}
