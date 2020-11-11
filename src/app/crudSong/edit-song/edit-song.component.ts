import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';
import {Iuser} from '../../interface/iuser';
import {Observable, Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {IArtist} from '../../interface/iartist';


@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {

  user: Iuser = {
    userId: 0,
  };

  song: ISong = {
    song_url: ''
  };

  artist: IArtist

  artists: IArtist[] = [];
  selectedArtist: IArtist;
  process$: number;
  songForm: FormGroup;
  songFileSelected: File = null;
  coverArtFileSelected: File = null;
  checkSongFile: boolean;
  checkUploadedFile = true;
  checkedCoverArtFile: boolean;
  message: string;
  message2: string;
  sub:  Subscription;
  loginRequest: Iloginrequest;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private service: ISongService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    console.log(this.loginRequest.id);
    this.user.userId = this.loginRequest.id;
  }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      name: ['', [Validators.required]],
      // artist: ['', [Validators.required]],
      genre: [''],
      description: ['']
    });
    this.checkSongFile = false;
    this.checkUploadedFile = false;
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
      this.song.songId = +paramMap.get('id');
    });
    this.getSongById(this.song.songId);
    this.getAllArtist();
  }

  checkCoverArtFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.checkedCoverArtFile = true;
      console.log(event.target.files[0].size);
      const imgName = event.target.files[0].name.split('.').slice(1, 2);
      console.log(imgName);
      if (imgName == 'png' || imgName == 'jpeg' || imgName == 'gif' || imgName == 'jpg') {
        this.coverArtFileSelected = event.target.files[0];
        this.getCoverArtUrl();
        this.checkedCoverArtFile = false;
      } else {
        this.checkedCoverArtFile = true;
        this.message2 = null;
      }
    }
  }

  checkFile(event): void {
    if (event.target.files && event.target.files[0]) {
      this.checkUploadedFile = true;
      const fileName = event.target.files[0].name.split('.').slice(1, 2);
      console.log(fileName);
      if (fileName == 'mp3' || fileName == 'wav' || fileName == 'ogg') {
        this.songFileSelected = event.target.files[0];
        this.getSongUrl();
        this.checkSongFile = false;
      } else {
        this.checkSongFile = true;
        this.message = null;
      }
    }
  }

  submit() {
    this.song = {
      ...this.song,
      ...this.songForm.value
    }
    this.song.date = new Date();
    this.song.user = this.user;
    console.log(this.song);
    this.service.createSong(this.song).subscribe(next => this.router.navigateByUrl('/personal')
    );
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
    },() => this.checkUploadedFile = false);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.song.song_url = url;
          }
          console.log(this.song.song_url);
          this.message = 'upload completed';
          // alert("upload completed, please click submit")
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

  checkform(): boolean {
    if (this.songForm.invalid || this.checkSongFile || this.checkUploadedFile || this.checkedCoverArtFile) {
      return true;
    }
  }
  getSongById(id: number): void {
    this.service.getSongByID(id).subscribe(pr => {
      this.song = pr;
      this.songForm.patchValue(pr)
    });
  }

  editSong(): void {
    const song = this.songForm.value;
    this.service.updateSong(this.song.songId, song).subscribe(() => {
      this.router.navigate(['song']);
    });
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

  getArtist(id) {
    this.song.artist.id = parseInt(id);
  }
}
