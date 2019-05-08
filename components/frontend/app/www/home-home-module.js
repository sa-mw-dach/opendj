(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["home-home-module"], {

        /***/
        "./src/app/home/home.module.ts":
        /*!*************************************!*\
          !*** ./src/app/home/home.module.ts ***!
          \*************************************/
        /*! exports provided: HomePageModule */
        /***/
            (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
            /* harmony import */
            var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */
            var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
            /* harmony import */
            var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
            /* harmony import */
            var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
            /* harmony import */
            var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
            /* harmony import */
            var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
            /* harmony import */
            var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! ./home.page */ "./src/app/home/home.page.ts");







            var HomePageModule = /** @class */ (function() {
                function HomePageModule() {}
                HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                        imports: [
                            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([{
                                path: '',
                                component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                            }])
                        ],
                        declarations: [
                            _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                        ]
                    })
                ], HomePageModule);
                return HomePageModule;
            }());



            /***/
        }),

        /***/
        "./src/app/home/home.page.html":
        /*!*************************************!*\
          !*** ./src/app/home/home.page.html ***!
          \*************************************/
        /*! no static exports found */
        /***/
            (function(module, exports) {

            module.exports = "<ion-header >\n\n  <ion-toolbar class=\"header-bg\">\n    <ion-buttons slot=\"start\">\n      <ion-button style=\"color: white\" >\n        <ion-icon slot=\"icon-only\" name=\"arrow-round-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n\n      <div class=\"current-song\">\n        <h3>Song currently</h3>\n      </div>\n    <ion-buttons slot=\"end\">\n      <ion-button style=\"color: white\" >\n        <ion-icon slot=\"icon-only\" name=\"arrow-round-forward\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n<ion-list class=\"list-override\" lines=\"none\">\n  <ion-item *ngFor=\"let item of playlist.tracks; let index = $index\">\n    <ion-thumbnail slot=\"start\">\n      <img src=\"{{ item.image }}\" />\n    </ion-thumbnail>\n    <ion-label>\n      <h3>{{ item.trackName }}</h3>\n      <p>{{ item.artistName }}</p>\n    </ion-label>\n    <ion-button style=\"color: white\" (click)=\"move(index, index + 1)\" expand=\"outline\" slot=\"end\">\n      <ion-icon slot=\"icon-only\" name=\"thumbs-up\"></ion-icon>\n    </ion-button>\n    <ion-button style=\"color: white\" (click)=\"move(index, index - 1)\" expand=\"outline\" slot=\"end\">\n      <ion-icon slot=\"icon-only\" name=\"thumbs-down\"></ion-icon>\n    </ion-button>\n  </ion-item>\n</ion-list>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <ion-button style=\"color: white\" (click)=\"presentAddSongPrompt()\" expand=\"full\" fill=\"clear\">ADD</ion-button>\n  </ion-toolbar>\n</ion-footer>\n"

            /***/
        }),

        /***/
        "./src/app/home/home.page.scss":
        /*!*************************************!*\
          !*** ./src/app/home/home.page.scss ***!
          \*************************************/
        /*! no static exports found */
        /***/
            (function(module, exports) {

            module.exports = ".list-override {\n  position: relative; }\n\n.current-song {\n  background: transparent;\n  color: white;\n  text-align: center;\n  height: 10vh;\n  margin-bottom: 5%; }\n\n.header-bg {\n  background: linear-gradient(162deg, rgba(129, 144, 185, 0.8) 20%, rgba(56, 70, 108, 0.8) 100%) !important; }\n\nion-toolbar {\n  --ion-background-color: linear-gradient(162deg, rgba(79, 83, 94, 0.8) 20%, rgba(56, 70, 108, .8) 100%) !important; }\n\nion-content {\n  --ion-background-color: linear-gradient(162deg, rgba(79, 83, 94, 0.8) 20%, rgba(56, 70, 108, .8) 100%) !important\n; }\n\nion-list {\n  --ion-background-color: rgba(53, 54, 56, 0.8) !important; }\n\nion-item {\n  color: white;\n  --ion-background-color: linear-gradient(162deg, rgba(79, 83, 94, 0.8) 20%, rgba(56, 70, 108, .8) 100%) !important; }\n\nion-footer {\n  --ion-color: white\n; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jb2x1bWJlbm5ldHQvd29yay9PcGVuREovZnJvbnRlbmQvYXBwL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFrQixFQUFBOztBQUlwQjtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFRbkI7RUFDRSx5R0FBd0csRUFBQTs7QUFHMUc7RUFDRSxpSEFBdUIsRUFBQTs7QUFHekI7RUFDRTtBQUF1QixFQUFBOztBQUd6QjtFQUNFLHdEQUF1QixFQUFBOztBQUd6QjtFQUNFLFlBQVk7RUFDWixpSEFBdUIsRUFBQTs7QUFHekI7RUFDRTtBQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ1NTIG92ZXJyaWRlc1xuXG4ubGlzdC1vdmVycmlkZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgLy8gdG9wOiAtMTB2aDtcbn1cblxuLmN1cnJlbnQtc29uZyB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMHZoO1xuICBtYXJnaW4tYm90dG9tOiA1JTtcbn1cblxuLmJ0bi12b3RlIHtcbiAgLy8gY29sb3I6IGJsYWNrO1xuICAvLyBib3JkZXItY29sb3I6IGJsYWNrICFpbXBvcnRhbnQ7XG59XG5cbi5oZWFkZXItYmcge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTYyZGVnLCByZ2JhKDEyOSwgMTQ0LCAxODUsIDAuOCkgMjAlLCByZ2JhKDU2LCA3MCwgMTA4LCAuOCkgMTAwJSkgIWltcG9ydGFudDtcbn1cblxuaW9uLXRvb2xiYXIge1xuICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoMTYyZGVnLCByZ2JhKDc5LCA4MywgOTQsIDAuOCkgMjAlLCByZ2JhKDU2LCA3MCwgMTA4LCAuOCkgMTAwJSkgIWltcG9ydGFudDtcbn1cblxuaW9uLWNvbnRlbnQge1xuICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiBsaW5lYXItZ3JhZGllbnQoMTYyZGVnLCByZ2JhKDc5LCA4MywgOTQsIDAuOCkgMjAlLCByZ2JhKDU2LCA3MCwgMTA4LCAuOCkgMTAwJSkgIWltcG9ydGFudFxufVxuXG5pb24tbGlzdHtcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1MywgNTQsIDU2LCAwLjgpICFpbXBvcnRhbnQ7XG59XG5cbmlvbi1pdGVte1xuICBjb2xvcjogd2hpdGU7XG4gIC0taW9uLWJhY2tncm91bmQtY29sb3I6IGxpbmVhci1ncmFkaWVudCgxNjJkZWcsIHJnYmEoNzksIDgzLCA5NCwgMC44KSAyMCUsIHJnYmEoNTYsIDcwLCAxMDgsIC44KSAxMDAlKSAhaW1wb3J0YW50O1xufVxuXG5pb24tZm9vdGVyIHtcbiAgLS1pb24tY29sb3I6IHdoaXRlXG59XG5cbiJdfQ== */"

            /***/
        }),

        /***/
        "./src/app/home/home.page.ts":
        /*!***********************************!*\
          !*** ./src/app/home/home.page.ts ***!
          \***********************************/
        /*! exports provided: HomePage */
        /***/
            (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
            /* harmony import */
            var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */
            var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
            /* harmony import */
            var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
            /* harmony import */
            var _sdk_playlist_api_playlists_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../../../sdk/playlist/api/playlists.service */ "./sdk/playlist/api/playlists.service.ts");
            /* harmony import */
            var _sdk_playlist_api_addTrack_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ../../../sdk/playlist/api/addTrack.service */ "./sdk/playlist/api/addTrack.service.ts");
            /* harmony import */
            var _sdk_spotify_provider_api_default_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ../../../sdk/spotify-provider/api/default.service */ "./sdk/spotify-provider/api/default.service.ts");
            /* harmony import */
            var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



            // import { ApiService } from '../services/api.service';
            // import * as API from '../../../sdk/playlist/api/api';




            // import { Track } from '../../../sdk/playlist/model/track';
            var HomePage = /** @class */ (function() {
                function HomePage(alertController, AddTrackApi, PlayListsApi, SpotifyApi, http) {
                    var _this = this;
                    this.alertController = alertController;
                    this.AddTrackApi = AddTrackApi;
                    this.PlayListsApi = PlayListsApi;
                    this.SpotifyApi = SpotifyApi;
                    this.http = http;
                    this.playlist = {
                        _id: '0',
                        name: '',
                        tracks: []
                    };
                    // this.playlist.tracks = [
                    //   {
                    //     resourceURI: '',
                    //     trackName: 'The Whole Universe Wants to Be Touched',
                    //     albumName: 'All Melody',
                    //     artistName: 'Nils Frahm',
                    //     image: 'https://i.scdn.co/image/0bd22d8c20675f1c641fe447be5c90dc1e861f18'
                    //   }
                    // ];
                    setInterval(function() {
                        _this.PlayListsApi.playlistsGet()
                            .subscribe(function(data) {
                                // debugger
                                _this.playlist = data[0];
                            }, function(err) { console.error(err); }, function() {});
                    }, 5000);
                    // this.api.configuration.basePath = 'http://playlist-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com';
                }
                HomePage.prototype.ngOnInit = function() {
                    var _this = this;
                    // this.SpotifyApi.currentTrackGet();
                    this.PlayListsApi.playlistsGet().subscribe(function(data) {
                        _this.playlist = data[0];
                        // this.playlist.tracks.push(
                        //   {
                        //     trackName: 'The Whole Universe Wants to Be Touched',
                        //     albumName: 'All Melody',
                        //     artistName: 'Nils Frahm',
                        //     image: 'https://i.scdn.co/image/0bd22d8c20675f1c641fe447be5c90dc1e861f18'
                        //   }
                        // );
                    }, function(err) {
                        console.error(err);
                    }, function() {});
                };
                HomePage.prototype.move = function(old_index, new_index) {
                    while (old_index < 0) {
                        old_index += this.data.length;
                    }
                    while (new_index < 0) {
                        new_index += this.data.length;
                    }
                    if (new_index >= this.data.length) {
                        var k = new_index - this.data.length;
                        while (k-- + 1) {
                            this.data.push(undefined);
                        }
                    }
                    this.data.splice(new_index, 0, this.data.splice(old_index, 1)[0]);
                };
                HomePage.prototype.presentAddSongPrompt = function() {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function() {
                        var alert;
                        var _this = this;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/ , this.alertController.create({
                                        header: 'Add Song',
                                        inputs: [{
                                            name: 'songUri',
                                            type: 'text',
                                            id: 'uri-input',
                                            value: '',
                                            placeholder: 'Placeholder 2'
                                        }],
                                        buttons: [{
                                                text: 'Cancel',
                                                role: 'cancel',
                                                cssClass: 'secondary',
                                                handler: function() {
                                                    console.log('Confirm Cancel');
                                                    alert.dismiss();
                                                    // this.presentErrorAlert();
                                                }
                                            },
                                            {
                                                text: 'Add To Playlist',
                                                handler: function(data) {
                                                    console.log('Confirm Ok', data, _this.playlist);
                                                    // spotify:track:1tT3WfvorMsmKuQbkKMRpv
                                                    var baseUrl = 'http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com';
                                                    var playlistUrl = 'http://playlist-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/api/v1/';
                                                    var trackId = data.songUri.replace('spotify:track:', '');
                                                    _this.http.get(baseUrl + "/trackInfo/" + trackId).subscribe(function(res) {
                                                        // if (data !== null) {
                                                        console.log('get', res);
                                                        var request = {
                                                            // 'body': {
                                                            '_id': '0',
                                                            'track': {
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
                                                        _this.http.post(playlistUrl + "/addtrack", request).subscribe(function(resdata) {
                                                            console.log('add track', resdata);
                                                        }, function(err) {
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
                                                    }, function(err) {
                                                        console.error(err);
                                                        alert.dismiss();
                                                        _this.presentErrorAlert();
                                                    }, function() {});
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
                                    })];
                                case 1:
                                    alert = _a.sent();
                                    return [4 /*yield*/ , alert.present()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/ ];
                            }
                        });
                    });
                };
                HomePage.prototype.presentSuccessAlert = function() {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function() {
                        var alert;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/ , this.alertController.create({
                                        header: 'Success',
                                        subHeader: 'Successfully added ',
                                        message: 'This is an alert message.',
                                        buttons: ['OK']
                                    })];
                                case 1:
                                    alert = _a.sent();
                                    return [4 /*yield*/ , alert.present()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/ ];
                            }
                        });
                    });
                };
                HomePage.prototype.presentErrorAlert = function() {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function() {
                        var alert;
                        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function(_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/ , this.alertController.create({
                                        header: 'Warning',
                                        subHeader: 'Unable to post Song selection',
                                        message: 'Please try again.',
                                        buttons: ['OK']
                                    })];
                                case 1:
                                    alert = _a.sent();
                                    return [4 /*yield*/ , alert.present()];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/ ];
                            }
                        });
                    });
                };
                HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                        selector: 'app-home',
                        template: __webpack_require__( /*! ./home.page.html */ "./src/app/home/home.page.html"),
                        styles: [__webpack_require__( /*! ./home.page.scss */ "./src/app/home/home.page.scss")]
                    }),
                    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
                        _sdk_playlist_api_addTrack_service__WEBPACK_IMPORTED_MODULE_4__["AddTrackService"],
                        _sdk_playlist_api_playlists_service__WEBPACK_IMPORTED_MODULE_3__["PlaylistsService"],
                        _sdk_spotify_provider_api_default_service__WEBPACK_IMPORTED_MODULE_5__["DefaultService"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]
                    ])
                ], HomePage);
                return HomePage;
            }());



            /***/
        })

    }
]);
//# sourceMappingURL=home-home-module.js.map