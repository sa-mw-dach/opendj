import { Component, OnInit, DebugElement } from '@angular/core';

import { TrackItem, Playlist } from '../models/playlist-item.model';
import { AlertController } from '@ionic/angular';
// import { ApiService } from '../services/api.service';

// import * as API from '../../../sdk/playlist/api/api';
import { PlaylistsService } from '../../../sdk/playlist/api/playlists.service';
import { AddTrackService } from '../../../sdk/playlist/api/addTrack.service';

import { DefaultService } from '../../../sdk/spotify-provider/api/default.service';
import { HttpClient } from '@angular/common/http';

// import { Track } from '../../../sdk/playlist/model/track';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  data: any;
  playlist: any;

  constructor(
    public alertController: AlertController,
    public AddTrackApi: AddTrackService,
    public PlayListsApi: PlaylistsService,
    public SpotifyApi: DefaultService,
    public http: HttpClient
  ) {

    this.playlist = {
      _id: '0',
      name: '',
      tracks: []
    };

    this.playlist.tracks = [
      {
        resourceURI: '',
        trackName: 'The Whole Universe Wants to Be Touched',
        albumName: 'All Melody',
        artistName: 'Nils Frahm',
        image: 'assets/imgs/logo_transparent.png'
        // image: 'https://i.scdn.co/image/0bd22d8c20675f1c641fe447be5c90dc1e861f18'
      }
    ];
    // setInterval(() => {
    //   this.PlayListsApi.playlistsGet()
    //   .subscribe(
    //     (data) => {
    //       // debugger
    //       this.playlist = data[0];
    //     },
    //     (err) => {console.error(err); },
    //     () => {}
    //   );
    // }, 5000);
    // this.api.configuration.basePath = 'http://playlist-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com';
  }

  ngOnInit() {

    // this.SpotifyApi.currentTrackGet();
    // this.PlayListsApi.playlistsGet().subscribe(
    //   data => {
    //     this.playlist = data[0];
    //     // this.playlist.tracks.push(
    //     //   {
    //     //     trackName: 'The Whole Universe Wants to Be Touched',
    //     //     albumName: 'All Melody',
    //     //     artistName: 'Nils Frahm',
    //     //     image: 'https://i.scdn.co/image/0bd22d8c20675f1c641fe447be5c90dc1e861f18'
    //     //   }
    //     // );
    //   },
    //   err => {
    //     console.error(err);
    //   },
    //   () => {}
    // );
  }

  move(old_index, new_index) {
    while (old_index < 0) {
      old_index += this.data.length;
    }
    while (new_index < 0) {
      new_index += this.data.length;
    }
    if (new_index >= this.data.length) {
      let k = new_index - this.data.length;
      while (k-- + 1) {
        this.data.push(undefined);
      }
    }
    this.data.splice(new_index, 0, this.data.splice(old_index, 1)[0]);
  }

  async presentAddSongPrompt() {
    const alert = await this.alertController.create({
      header: 'Add Song',
      inputs: [
        {
          name: 'songUri',
          type: 'text',
          id: 'uri-input',
          value: '',
          placeholder: 'Placeholder 2'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            alert.dismiss();
            // this.presentErrorAlert();
          }
        },
        {
          text: 'Add To Playlist',
          handler: data => {
            console.log('Confirm Ok', data, this.playlist);



            // spotify:track:1tT3WfvorMsmKuQbkKMRpv
            const baseUrl = 'http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com';
            const playlistUrl = 'http://playlist-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com/api/v1/';
            const trackId = data.songUri.replace('spotify:track:', '');
            this.http.get(`${baseUrl}/trackInfo/${trackId}`).subscribe(
              (res: any) => {
                // if (data !== null) {
                  console.log('get', res);
                  const request: object  = {
                    // 'body': {
                      '_id': '0',
                      'track':   {
                        'resourceURI': data.songUri,
                        'trackName': res.trackName,
                        'albumName': res.albumName,
                        'artistName': res.artistName,
                        'image': res.image
                        // 'imageObject': {
                        //   'externalURI': 'string'
                        // }
                      }
                    // }
                  };

                  // let body = JSON.parse(request);
                  this.http.post(`${playlistUrl}/addtrack`, request).subscribe((resdata) => {
                    console.log('add track', resdata);
                  }, (err) => {
                    console.error(err);
                    alert.dismiss();
                    // this.presentErrorAlert();
                  });

                  // console.log(request);
                  // this.AddTrackApi.addtrackPost(request).subscribe((resdata) => {
                  //   console.log('add track', resdata);
                  // }, (err) => {
                  //   console.error(err);
                  //   alert.dismiss();
                  //   this.presentErrorAlert();
                  // }, () => {
                  //   alert.dismiss();
                  //   this.presentSuccessAlert();
                  // });
                // }
              },
              err => {
                console.error(err);
                alert.dismiss();
                this.presentErrorAlert();
              },
              () => {}

            );

            // if(request.track !== null) {


            // }
                        // this.SpotifyApi.currentTrackGet(trackId).subscribe((data) => {
            //     console.log('add track', data);
            //   }, (err) => {
            //     console.error(err)
            //     alert.dismiss();
            //     this.presentErrorAlert();
            //   }, () => {
            //     alert.dismiss();
            //     this.presentSuccessAlert();
            //   })
            // this.SpotifyApi.playPost()
            // this.AddTrackApi.addtrackPost(request).subscribe((data) => {
            //   console.log('add track', data);
            // }, (err) => {
            //   console.error(err)
            //   alert.dismiss();
            //   this.presentErrorAlert();
            // }, () => {
            //   alert.dismiss();
            //   this.presentSuccessAlert();
            // });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Successfully added ',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'Unable to post Song selection',
      message: 'Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
