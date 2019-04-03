import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AddSongRequestObject } from './../models/add-song-request.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://www.server.com/api/';

  constructor(private httpClient: HttpClient) {}

  addSong(reqBody: AddSongRequestObject) {
    // return this.httpClient.post(this.apiURL, reqBody);
    console.log(reqBody);
  }

  getPlaylist() {

  }
}
