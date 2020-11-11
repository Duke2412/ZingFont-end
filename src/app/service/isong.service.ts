import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISong} from '../interface/isong';
import {IArtist} from '../interface/iartist';




const API_URL = 'http://localhost:8080/song';
const API_URL2 = 'http://localhost:8080/artist';


@Injectable({
  providedIn: 'root'
})
export class ISongService {


  constructor(private http: HttpClient) {
  }


  getAllSongByPlay(): Observable<ISong[]> {
    return this.http.get<ISong[]>(API_URL + `/plays/desc`)
  }

  getAllSongByLikes(): Observable<ISong[]> {
    return this.http.get<ISong[]>(API_URL + `/likes/desc`)
  }

  getAllSongByDate(): Observable<ISong[]> {
    return this.http.get<ISong[]>(API_URL + `/date/desc`)
  }
  getSongByID(id: number): Observable<ISong> {
    return this.http.get<ISong>(API_URL + `/${id}`)
  }
  getUser(id: number): Observable<ISong> {
    return this.http.get<ISong>(API_URL + `/songs/${id}`)
  }
  createSong(song: ISong): Observable<ISong>{
    return this.http.post<ISong>(API_URL + `/create`, song);
  }

  updateSong(id: number, song: ISong): Observable<ISong> {
    return this.http.put<ISong>(API_URL + `/update/${id}`, song);
  }
  deleteSong(id: number): Observable<ISong> {
    return  this.http.delete<ISong>(API_URL + `/delete/${id}`);
  }
  getAllSongByUser(id: number): Observable<ISong[]>{
    return this.http.get<ISong[]>(API_URL + `/listByUid/${id}`);
  }
  searchSongByName(name: string): Observable<ISong[]>{
    return this.http.get<ISong[]>(API_URL + `/search/${name}`);
  }
  getAllArtist(): Observable<IArtist[]> {
    return this.http.get<IArtist[]>(API_URL + `/allArtist`)
  }
  getArtistAllSong(id: number): Observable<ISong[]>{
    return this.http.get<ISong[]>(API_URL + `/listByArtist/${id}`);
  }

  createArtist(artist: IArtist): Observable<IArtist>{
    return this.http.post<IArtist>(API_URL2 + `/create-artist`, artist);
  }
  // deleteArtist(id: number): Observable<IArtist>{
  //   return this.http.delete<IArtist>(API_URL2 + `/delete-artist/${id}`);
  // }
  // getArtistByID(id: number): Observable<IArtist> {
  //   return this.http.get<IArtist>(API_URL2 + `/${id}`)
  // }
}





