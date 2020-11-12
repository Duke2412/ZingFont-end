import { Component, OnInit } from '@angular/core';
import {IArtist} from '../../interface/iartist';
import {ISongService} from '../../service/isong.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Iloginrequest} from '../../interface/Iloginrequest';
import {Iuser} from '../../interface/iuser';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {
  user: Iuser = {
    userId:2,
    name:"admin"
  };
  artist: IArtist;
  artistFrom: FormGroup;
  loginRequest: Iloginrequest = null;
  checkedCoverArtFile: boolean;
  coverArtFileSelected: File = null;
  message2: string;

  constructor(private iSongService: ISongService,
              private fb: FormBuilder,
              private router: Router,
              private storage: AngularFireStorage, ) {
    this.loginRequest = JSON.parse((sessionStorage.getItem("user")));
    this.user.userId = this.loginRequest.id;
  }

  ngOnInit(): void {
    this.artistFrom = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  summit(){
    this.artist = {
      ...this.artist,
      ...this.artistFrom.value
    }
    console.log(this.artist);
    this.iSongService.createArtist(this.artist).subscribe(next => this.router.navigateByUrl('/artist'));
  }
  get name() {
    return this.artistFrom.get('name');
  }
  checkform(): boolean {
    if (this.artistFrom.invalid ) {
      return true;
    }
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
  getCoverArtUrl() {
    const asName = this.coverArtFileSelected.name.split('.').slice(0, 1);
    const filePath = `CoverArt/${asName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.coverArtFileSelected);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.artist.cover_art_url = url;
          }
          console.log(this.artist.cover_art_url);
          this.message2 = 'upload completed';
        });
      })
    ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }
}
