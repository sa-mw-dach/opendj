import requests
import json
import time
import sys
import os

playlist_service_url = os.getenv('PLAYLIST_URL','http://playlist-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com/api/v1/')
boundary_service_url = os.getenv('BOUNDARY_SERVICE_URL','http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com/')
playlist_service_polling_timeout_msec = int(os.getenv('PLAYLIST_SERVICE_POLLING_TIMEOUT_MSEC','100')) / 1000.0
backend_service_polling_timeout_msec = int(os.getenv('BACKEND_SERVICE_POLLING_TIMEOUT_MSEC','5000')) / 1000.0

try:
    while True:
        # retrieve playlists
        response = requests.get(playlist_service_url + '/playlists')
        response.raise_for_status()

        print(response.content)
        playlists = json.loads(response.content)

        #print("The response contains {0} properties".format(len(playlists)))
        #print(playlists[0])
        if len(playlists) > 0:
            while True:
                # retrieve first track from first playlist
                response = requests.get(playlist_service_url + 'playlists/' + playlists[0]['_id'] + '/firstTrack')
                print(response)
                if response.status_code == 404:
                    break;
                response.raise_for_status()
                first_track_object = json.loads(response.content)
                
                # tell backend to play track
                response = requests.post(boundary_service_url + 'play', data={"track":first_track_object['_id']})
                response.raise_for_status()

                while True:
                    # retrieve player status from backend
                    response = requests.get(boundary_service_url + 'currentTrack')
                    response.raise_for_status()
                    currentTrack = json.loads(response.content)

                    if (not currentTrack['is_playing']) or (currentTrack['progress_ms'] >= currentTrack['duration_ms']):
                        break
                    
                    # sleep some time
                    time.sleep(backend_service_polling_timeout_msec)

                # remove first track from playlist
                response = requests.delete(playlist_service_url + 'playlists/' + playlists[0]['_id'] + '/tracks/' + first_track_object['resourceURI'])
                response.raise_for_status()
        time.sleep(playlist_service_polling_timeout_msec)

except requests.exceptions.RequestException as e:
    print(e)
    sys.exit(1)