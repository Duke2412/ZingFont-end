import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NghenhieunhatComponent} from './nghenhieunhat/nghenhieunhat.component';

import {HttpClientModule} from '@angular/common/http';
import {Likenhieunhat10baiComponent} from './likenhieunhat10bai/likenhieunhat10bai.component';
import {BaimoitaoComponent} from './baimoitao/baimoitao.component';
import { Baimoitao30Component } from './baimoitao30/baimoitao30.component';
import { HomeComponent } from './home/home.component';
import { Top30Component } from './top30/top30.component';
import { TopLikeComponent } from './top-like/top-like.component';
import { PlaymusicComponent } from './playmusic/playmusic.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';

import {environment} from '../environments/environment';
import { CreateSongComponent } from './crudSong/create-song/create-song.component';
import { DeleteSongComponent } from './crudSong/delete-song/delete-song.component';
import { EditSongComponent } from './crudSong/edit-song/edit-song.component';
import { ListSongComponent } from './crudSong/list-song/list-song.component';
import { DetailSongComponent } from './crudSong/detail-song/detail-song.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { SearchSongComponent } from './search-song/search-song.component';
import {CookieService} from 'ngx-cookie-service';

import { ListArtistComponent } from './crudArtist/list-artist/list-artist.component';
import { CreateArtistComponent } from './crudArtist/create-artist/create-artist.component';
import { ArtistListSongComponent } from './crudArtist/artist-list-song/artist-list-song.component';
import {EditPlaylistComponent} from './crudPlaylist/edit-playlist/edit-playlist.component';
import {CreatePlaylistComponent} from './crudPlaylist/create-playlist/create-playlist.component';
import {ListPlaylistComponent} from './crudPlaylist/list-playlist/list-playlist.component';
import {EditUserComponent} from './crudUser/edit-user/edit-user.component';
import {CreteUserComponent} from './crudUser/crete-user/crete-user.component';
import { SongbyplaylistComponent } from './songbyplaylist/songbyplaylist.component';
import { AllPlayListComponent } from './crudPlaylist/all-play-list/all-play-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NghenhieunhatComponent,
    Likenhieunhat10baiComponent,
    BaimoitaoComponent,
    Baimoitao30Component,
    HomeComponent,
    Top30Component,
    TopLikeComponent,
    PlaymusicComponent,
    LoginComponent,
    CreateSongComponent,
    DeleteSongComponent,
    EditSongComponent,
    ListSongComponent,
    DetailSongComponent,
    SearchSongComponent,
    ListArtistComponent,
    CreateArtistComponent,
    ArtistListSongComponent,
    CreteUserComponent,
    EditUserComponent,
    ListPlaylistComponent,
    CreatePlaylistComponent,
    EditPlaylistComponent,
    AllPlayListComponent,
    SongbyplaylistComponent,

  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
