
# Architecture Principles
1. Cloud Native - ready to scale to handle hundreds of music events with thousands of users each happening in parallel around the world.
1. Style: Micro Services Architecure 
1. Async, Loose coupled, event driven. No polling at all
1. Design should strive for robust and fast implementation (see NFRs)
1. Resilient - Every component should be deployed/scaled to at least 2 instances 
1. no single point of failure
1. Use Red Hat Enterprise Products as much as possible - avoid community upstream projects.


# Architecture Overview
```plantuml
@startuml component

together {
      actor User as user
      actor Curator as curator
      actor EventOwner as eventowner
}

together {
      component [frontend-web-user] as frontendwebuser  
      component [frontend-web-curator] as frontendwebcurator
      component [frontend-web-event] as frontendwebevent
}


together {
      together {
      component [service-playlist-api] as serviceplaylistapi  
      component [service-playlist-db] as serviceplaylistdb

      }
      component [service-user] as serviceuserapi
      component [service-event] as serviceeventapi  
      component [service-playback-ctrl] as serviceplaybackctrl
}

together {
      component [boundary-spotify] as boundaryspotify  
}

cloud  {
  component SpotifyAPI  as spotifyapi
}


user -> frontendwebuser
curator->frontendwebcurator
eventowner->frontendwebevent

frontendwebuser -> serviceuserapi
frontendwebuser -> serviceeventapi
frontendwebuser -> serviceplaylistapi
serviceplaylistapi -> serviceplaylistdb

serviceplaybackctrl -> serviceplaylistapi
serviceplaybackctrl -> boundaryspotify

boundaryspotify --> spotifyapi 

```
