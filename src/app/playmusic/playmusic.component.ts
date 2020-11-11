import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ISong} from "../interface/isong";
import {ISongService} from "../service/isong.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {SongControllerService} from "../service/song-controller.service";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import * as moment from "moment";
import {isLineBreak} from 'codelyzer/angular/sourceMappingVisitor';

@Component({
  selector: 'app-playmusic',
  templateUrl: './playmusic.component.html',
  styleUrls: ['./playmusic.component.scss']
})
export class PlaymusicComponent implements OnInit {
  audioFile = new Audio();
  song: ISong;
  currentTime = "00:00";
  duration = "00:00";
  seek = 0;
  songName = 'unknown_songName';
  artist = 'unknown_artist';
  playing = true;
  listSong: number[] = [];
  audioEvent = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart'
  ]
  endedCountEvent = 0;
  pauseCountEvent = 0;
  currentSong = null;
  checked = false;
  checkplay = false;

  constructor(
    private iSongService: ISongService,
    private songController: SongControllerService,
    private cookie: CookieService,
    private service: ISongService,
  ) {
    songController.changeEmitted$.subscribe(x => {
      if (this.currentSong != cookie.get('current-song')) {
        this.currentSong = cookie.get('current-song');
      }
      if( this.currentSong != null) {
        this.onChanges();
      }
      if (this.audioFile.ended) {
        console.log()
      }
    });
  }

  ngOnInit(): void {
    if (this.currentSong != null){
      this.onChanges();
    }
  }

  onChanges() {
    this.listSong = JSON.parse((this.cookie.get('current-list')));
    this.getSongById(parseInt(this.currentSong));
  }

  getSongById(id: number): void {
    this.iSongService.getSongByID(id).subscribe(p => {
      this.song = p;
    },error => console.log('err'),() => this.openFile(this.song))

  }

  getUrl(){
    if (this.song.song_url) {
    }
  }

  playpause() {
    this.playing = !this.playing;
    if (this.playing) {
      this.checkplay = true;
      this.play();

    } else
      this.pause();
      this.checkplay = false;

  }

  play(){
    this.audioFile.play().finally(() => console.log('play'));
    document.getElementById("playbutton").classList.remove("fa-play");
    document.getElementById("playbutton").classList.add("fa-pause");
  }

  pause(){
    this.audioFile.pause();
    document.getElementById("playbutton").classList.remove("fa-pause");
    document.getElementById("playbutton").classList.add("fa-play");
  }

  stop() {
    this.audioFile.pause();
    this.audioFile.currentTime = 0;
  }

  openFile(song: ISong){
    this.streamSong(song).subscribe(() =>console.log('ended'));
  }

  setVolume(event) {
    this.audioFile.volume = event.target.value;
  }

  streamSong(song: ISong) {
    return new Observable(observable => {
      this.audioFile.src = this.song.song_url;
      this.songName = this.song.name;
      this.artist = this.song.artist.name;
      this.audioFile.load();
      this.audioFile.play().finally(() => {
        this.endedCountEvent = 0
        this.song.plays = this.song.plays + 1;
        console.log(this.song.plays);
        this.service.createSong(this.song).subscribe(x => {
          console.log(x.plays)
        })
      });
      let handler = (event: Event) => {
        this.seek = this.audioFile.currentTime;
        this.currentTime = this.timeFormat(this.audioFile.currentTime);
        this.duration = this.timeFormat(this.audioFile.duration);
        if(this.audioFile.ended){
          this.endedCountEvent++;
          if(this.endedCountEvent == 1){
            this.nextSong();
            console.log('next');
          }
        }
      }
      this.addEvent(this.audioFile, this.audioEvent, handler);
      return () => {
        this.audioFile.pause();
        this.audioFile.currentTime = 0;
        this.nextSong();
        // console.log('c')
        this.removeEvent(this.audioFile, this.audioEvent, handler);
      }
    })
  }

  addEvent(audio, event, handler) {
    event.forEach(event => {
      audio.addEventListener(event, handler);
    })
  }

  removeEvent(audio, event, handler) {
    event.forEach(event => {
      console.log('ended');
      audio.removeEventListener(event, handler);
    })
  }

  setSeek(event) {
    this.audioFile.currentTime = event.target.value;
  }

  timeFormat (time, format="HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  nextSong() {
    let i = 0;
    if(this.currentSong == this.listSong[this.listSong.length -1]) {
      this.currentSong = this.listSong[0];
    } else {
      while (this.currentSong != this.listSong[i] && i < this.listSong[this.listSong.length -1]) {
        i++
      }
      this.currentSong = this.listSong[i + 1];
    }
    this.onChanges();
    this.cookie.set('current-song', `${this.currentSong}`,10000);
    // this.endedCountEvent;
  }


  previousSong(event) {
    let i = 0;
    if(this.currentSong == this.listSong[0]) {
      console.log(event);
    } else {
      while (this.currentSong != this.listSong[i]) {
        i++
      }
      this.currentSong = this.listSong[i - 1];
    }
    this.onChanges();
    this.cookie.set('current-song', `${this.currentSong}`,10000);
  }
}
