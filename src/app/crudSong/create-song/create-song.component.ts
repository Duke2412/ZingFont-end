import {Component, OnInit} from '@angular/core';

import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Iuser} from '../../interface/iuser';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {Router} from '@angular/router';
import {IArtist} from '../../interface/iartist';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  user: Iuser = {
    userId:0
  }

  song: ISong = {
    song_url: ''
  };

  artists: IArtist[] = [];

  artist: IArtist = {
    id: 0
  };

  selectedArtist: IArtist
  loginRequest: Iloginrequest = null;
  process$: number;
  songForm: FormGroup;
  songFileSelected: File = null;
  coverArtFileSelected: File = null;
  checkedSongFile: boolean;
  checkUploadedFile = true;
  checkedCoverArtFile: boolean;
  message: string;
  message2: string;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private service: ISongService,
    private router: Router
  ){
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    console.log(this.loginRequest.id);
    this.user.userId = this.loginRequest.id;

  }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      name: ['', [Validators.required]],
      artist: [''],
      genre: [''],
      description: ['']
    });
    this.getAllArtist();
  }

  checkCoverArtFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.checkedCoverArtFile = true;
      console.log(event.target.files[0].size);
      const imgName = event.target.files[0].name.split('.').slice(1, 2);
      console.log(imgName);
      if (imgName == 'png' || imgName == 'jpg' || imgName == 'gif' || imgName == 'jpeg') {
        this.coverArtFileSelected = event.target.files[0];
        this.getCoverArtUrl();
        this.checkedCoverArtFile = false;
      } else {
        this.checkedCoverArtFile = true;
      }
    }
  }

  checkFile(event): void {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0].name.split('.').slice(1, 2));
      if (event.target.files[0].name.split('.').slice(1, 2) == 'mp3') {
        this.songFileSelected = event.target.files[0];
        this.getSongUrl();
        this.checkedSongFile = false;
      } else {
        this.checkedSongFile = true;
      }
    }
  }

  submit() {
    this.song = {
      ...this.song,
      ...this.songForm.value
    }
    console.log(this.song);
    this.song.date = new Date();
    this.song.user = this.user;
    this.song.artist = this.selectedArtist;
    console.log(this.song);
    this.service.createSong(this.song).subscribe(next => this.router.navigateByUrl('/personal'));
  }

  getCoverArtUrl() {
      const asName = this.coverArtFileSelected.name.split('.').slice(0, 1);
      const filePath = `CoverArt/${asName}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.coverArtFileSelected);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            if (url) {
              this.song.cover_art_url = url;
            }
            console.log(this.song.cover_art_url);
            this.message2 = 'upload completed';
          });
        })
      ).subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }


  getSongUrl() {
    const asName = this.songFileSelected.name.split('.').slice(0, 1);
    const file = this.songFileSelected;
    const filePath = `Audio/${asName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Audio/${asName}`, file);
    task.percentageChanges().subscribe(next => {
      this.process$ = next;
      console.log(this.process$);
    }, error => {
      console.log(error);
    }, () => this.checkUploadedFile = false);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.song.song_url = url;
          }
          console.log(this.song.song_url);
          this.message = 'upload completed';
        });
      })
    ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }

  get name() {
    return this.songForm.get('name');
  }

  get songFile() {
    return this.songForm.get('songFile');
  }

  getAllArtist() {
    this.service.getAllArtist().subscribe(p => {
      this.artists = p;
    }, error => {
    }, () => {
      console.log(this.artists);
      this.artists.forEach(value => {
        console.log(value.name)
        if (value.name == 'Unknown Artist') {
          this.selectedArtist = value;
        }})
      console.log(this.selectedArtist);
      return this.artists;
    });
  }

  checkform(): boolean {
    if (this.songForm.invalid || this.checkedSongFile || this.checkUploadedFile || this.checkedCoverArtFile) {
      return true;
    }
  }

  getArtist(id): void {
    this.artist.id = parseInt(id);
    this.selectedArtist = this.artist;
  }

  getEvent(event): void{
    console.log('input');
    console.log(event);
  }

}
