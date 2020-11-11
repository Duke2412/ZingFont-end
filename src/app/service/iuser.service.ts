import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Iuser} from '../interface/iuser';
import {Observable} from 'rxjs';




const API_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class IuserService {

  constructor(private http: HttpClient) { }


  createUser(user: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(API_URL + `/api/auth/register`, user);
  }
  updateUser(id: number, user: Iuser): Observable<Iuser> {
    return this.http.put<Iuser>(API_URL + `/user/update/${id}`, user);
  }
  getUserById(id: number): Observable<Iuser> {
    return this.http.get<Iuser>( API_URL + `/user/findUserById/${id}`);
  }
}
