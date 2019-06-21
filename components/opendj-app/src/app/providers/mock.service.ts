import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class MockService {

    constructor(public http: HttpClient) {}

    getEvents(): any {
        return this.http.get('assets/data/events.json');
    }

}
