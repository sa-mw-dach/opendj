import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class FEService {

    SPOTIFY_API =  'http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/backend-spotifyprovider';

    constructor(public http: HttpClient) {}

    searchTracks(queryString): any {
        return this.http.get(this.SPOTIFY_API + '/searchTrack?event=4711&q=' + queryString);
    }

}
