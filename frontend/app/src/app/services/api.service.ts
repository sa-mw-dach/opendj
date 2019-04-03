import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddSongRequestObject } from './../models/add-song-request.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://playlist-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com';

  constructor(private http: HttpClient) {}

  addSong(reqBody: AddSongRequestObject) {
    if (this.apiURL.length === 0) {
      return of(true);
    } else {
      return this.http.post(this.apiURL, reqBody);
    }
  }

  getPlaylist() {
    return this.http.get(`${this.apiURL}/api/v1/playlists`);
  }
}
