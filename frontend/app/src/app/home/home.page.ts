import { Component, OnInit } from '@angular/core';

import { PlaylistItem } from '../models/playlist-item.model';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

// import { PlaylistsService } from '../../../sdk/playlist/api/playlists.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  data: Array<PlaylistItem>;

  constructor(
    public alertController: AlertController,
    public api: ApiService
  ) {

  }

  ngOnInit() {
    this.data = [
      {
        title: 'Song 1',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      },
      {
        title: 'Song 2',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      },
      {
        title: 'Song 3',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      },
      {
        title: 'Song 4',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      },
      {
        title: 'Song 5',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      },
      {
        title: 'Song 6',
        subTitle: 'Song details like artist etc',
        img:
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
      }
    ];


    this.api.getPlaylist()
    .subscribe(
      (data) => {console.log(data); },
      (err) => {console.error(err); },
      () => {}
    );
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
        },
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
          handler: (data) => {
            console.log('Confirm Ok', data);
            alert.dismiss();
            this.presentSuccessAlert();
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
