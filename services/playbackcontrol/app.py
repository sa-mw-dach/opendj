import requests
import json
import time
import sys
import os

playlist_service_url = os.environ['PLAYLIST_URL'] or 'http://playlist-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com/api/v1/'
boundary_service_url = os.environ['BOUNDARY_SERVICE_URL'] or 'http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.hailstorm5.coe.muc.redhat.com/'

try:
    # retrieve playlists
    response = requests.get(playlist_service_url + '/playlists')
    response.raise_for_status()

    print(response.ok)
    print(response.content)
    playlists = json.loads(response.content)

    #print("The response contains {0} properties".format(len(playlists)))
    #print(playlists[0])

    while True:
        # retrieve first track from first playlist
        response = requests.get(playlist_service_url + 'playlist/' + playlists[0]['_id'] + '/firstTrack')
        response.raise_for_status()
        first_track_object = json.loads(response.content)
        
        # tell backend to play track
        response = requests.post(boundary_service_url + 'play', data={"track":first_track_object['_id']})
        response.raise_for_status()

        while True:
            # retrieve player status from backend
            response = request.get(boundary_service_url + 'currentTrack')
            response.raise_for_status()
            currentTrack = json.loads(response.content)

            if (not currentTrack['is_playing']) or (currentTrack['progress_ms'] >= currentTrack['progress_ms']):
                break
            
            # sleep some time
            time.sleep(5)

        # remove first track from playlist
        response = requests.delete(playlist_service_url + 'playlist/' + playlists[0]['_id'] + '/tracks/' + first_track_object['resourceURI'])
        response.raise_for_status()

except requests.exceptions.RequestException as e:
    print(e)
    sys.exit(1)