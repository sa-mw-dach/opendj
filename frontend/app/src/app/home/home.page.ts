import { Component, OnInit } from '@angular/core';

import { PlaylistItem } from '../models/playlist-item.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  data: Array<PlaylistItem>;

  constructor(public alertController: AlertController) {}

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
          }
        },
        {
          text: 'Add To Playlist',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
