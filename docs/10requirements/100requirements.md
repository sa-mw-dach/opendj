# Requirements
Here you can find the functional and non-functional requirements.   

### Content:
- [Functional Requirements - User Stories](#functional-requirements---user-stories)
  * [User](#user)
    + [Playlist](#playlist)
    + [Tracks](#tracks)
    + [Security & Privacy](#security---privacy)
  * [Curator](#curator)
    + [Playlist](#playlist-1)
    + [Contributing](#contributing)
  * [EventOwner](#eventowner)
    + [Event](#event)
    + [MusicProvider](#musicprovider)
    + [Playlist](#playlist-2)
    + [Statistics](#statistics)
- [NonFunctionalRequirements](#nonfunctionalrequirements)
  * [Availability](#availability)
  * [Response Time](#response-time)
  * [Quantity Structure](#quantity-structure)
  * [Networking](#networking)
  * [Usability](#usability)
  * [Security & Privacy](#security---privacy-1)


# Functional Requirements - User Stories
User Stories grouped by Epic and Sub-Epics. 
Stories are identified by numbers in format STRY-EE-UUU, where EE refers to the Epic, and UUU refers to the story. ID can be referenced in links.  


The high level vision is:  
**Users can add tracks to playlists. Curators can sort/edit a playlist. EventOwners host an Event where Music is relevant.**

Usage Scenarios  are:
- Small private gatherings, with just a handful of people. No dancing but a lot of chatting. Maybe about music. Dialogs like "Oh, if you like THIS songs, how about THAT one?"
- Medium private events, like a birthday party, 10-100 people, maybe with a small area. Private or professional PA.
- Large private events, likes a company Meeting. 100-2000 people, large dance floor, professional PA and DJ
- Public events, From small to large, 50-2000 people, maybe multiple dance floors, profession PA and DJs

## User

### Playlist
As User I want to see the Playlist on my mobile device.
<a name="STRY-10-100">\(STRY-10-100\)</a>

As User I want to see the Playlist on a screen at the location so that I don't need to pull out my mobile device.
<a name="STRY-10-110">\(STRY-10-110\)</a>

As User I want to see the ETA of a Track on the list, so I can plan on when to enter the dance floor.
<a name="STRY-10-120">\(STRY-10-120\)</a>

As User I want to create a new playlist because I think the current sucks and I can do better. I thereby become Curator of the new playlist. The new playlist could be empty, or a fork/clone of the current one.
<a name="STRY-10-130">\(STRY-10-130\)</a>

As User I want to request to become a Curator of the current Playlist.
<a name="STRY-10-140">\(STRY-10-140\)</a>

As User I want to see alternative Playlist if available.
<a name="STRY-10-150">\(STRY-10-150\)</a> 

As User I want to follow the playlist I like most.
<a name="STRY-10-160">\(STRY-10-160\)</a>

### Tracks
As User I want to be able to search for tracks by name or artist, view results and add a TRACK to the Playlist. I do that in OpenDJ, because maybe I don't have an account with a streaming provider.  
<a name="STRY-10-200">\(STRY-10-200\)</a>

As User I want to add a track from Spotify App by using "Share->Copy Link" and paste it into OpenDJ
<a name="STRY-10-210">\(STRY-10-210\)</a>  

As User I want to add a track from Spotify App by using "Share->Twitter->OpenDJ"
<a name="STRY-10-220">\(STRY-10-220\)</a>  

As User I want to add a track by private twitter message to @OpenDJ1 or special account/hastag of the event.
<a name="STRY-10-230">\(STRY-10-230\)</a>  

As User I want to add a track from Spotify App by using Share->OpenDJ
<a name="STRY-10-240">\(STRY-10-240\)</a>  

As User I want to EXPRESS LIKE/DISLIKE to a TRACK I see on the playlist
<a name="STRY-10-250">\(STRY-10-250\)</a> 

As User I want to request skipping of the current track because I hate it.
<a name="STRY-10-260">\(STRY-10-260\)</a> 

As User I want to add a TrackIdea which describes just a  genre/mood/vague track description to the Playlist, because I cant remember/find the actual track I have in my mind. 
<a name="STRY-10-270">\(STRY-10-270\)</a>

### Security & Privacy
As User I want to be able to login using my Google/LinkedIn/Twitter/.. Account so that I can join private events and maybe win prices during an event.
<a name="STRY-10-300">\(STRY-10-300\)</a>

As User I want to stay anonymous. I can login by selecting a funny name the system suggests to me ("For this event,you will be known as ...."). 
<a name="STRY-10-310">\(STRY-10-310\)</a>

## Curator

### Playlist
As  Curator, I want to re-order tracks in the Playlist. I could do that by moving it up/down a single position, or by dragging it to the desired position.
<a name="STRY-20-100">\(STRY-20-100\)</a>

As a Curator, I need more infos than a user  about a track like year, BPM, Genre. Mood, Danceability etc. so that I can order them decently.
<a name="STRY-20-110">\(STRY-20-110\)</a>

As Curator, I want to delete a TRACK from the playlist
<a name="STRY-20-120">\(STRY-20-120\)</a>

As Curator, I want to add a TRACK to the playlist using the search 
<a name="STRY-20-130">\(STRY-20-130\)</a>

As Curator, I want to listen into any track of the list on my mobile phone. 
<a name="STRY-20-140">\(STRY-20-140\)</a>

As Curator, I want to skip the current track immediately. 
<a name="STRY-20-150">\(STRY-20-150\)</a>

As a Curator, I want replace a TrackIdea with actual track using search.
<a name="STRY-20-160">\(STRY-20-160\)</a>

As a Curator I want to see a warning if a track has been already played at that event.
<a name="STRY-20-170">\(STRY-20-170\)</a>

### Contributing   
As a Curator, I want to promote other UserS to be also Curator of my playlist, so I dont share the burden alone.
<a name="STRY-20-200">\(STRY-20-200\)</a>

## EventOwner

### Event
As EventOwner, I want to register my event with opendj so that I can use it to manage the music playlist.
<a name="STRY-30-100">\(STRY-30-100\)</a>

As EventOwner, I can make my event public visible.
<a name="STRY-30-110">\(STRY-30-110\)</a>

As EventOwner, I can protect my event with an access code that users need to know to access the event 
<a name="STRY-30-120">\(STRY-30-120\)</a>

As EventOwner I can protect my event by requiring users to be authenticated. Then login with the typical OpenIDConnect providers (Google, Twitter, Facebook, ...) is required, asking for at least eMail Adress Scope. 
<a name="STRY-30-130">\(STRY-30-130\)</a>

As EventOwner I can make access to my event very easy without any authentication, users are then identified by an anonymous, system generated ID/Name.
<a name="STRY-30-140">\(STRY-30-140\)</a>

As EventOwner, I can decide that every User is also a Curator.
<a name="STRY-30-150">\(STRY-30-150\)</a>

As EventOwner, I want to generate a QR Code I can display  at the event location so that users can easily access the playlist.
<a name="STRY-30-160">\(STRY-30-160\)</a>

As EventOwner I would like to be able to prohibit that a track is played twice.
<a name="STRY-30-170">\(STRY-30-170\)</a>

As EventOwner, I might hire a DJ who does the actual playing of tracks, mixing the transition from one track to the next. In that case, an EVENT might be hosted without MusicProvider, just with TrackIdeas.
<a name="STRY-30-180">\(STRY-30-180\)</a>

### MusicProvider
As EventOwner, I want to register my MusicProvider to the Event, by using a secure authentication flow with the music provider, without entering my user/password into OpenDJ.
<a name="STRY-30-200">\(STRY-30-200\)</a>

As EventOwner, I want to use Spotify as MusicProvider.
<a name="STRY-30-210">\(STRY-30-210\)</a>

As EventOwner, I want all tracks that have been played to be added to a Spotify Playlist of my choice.
<a name="STRY-30-220">\(STRY-30-220\)</a>

As EventOwner, I want that all registered MusicProvider are being used to search and play
<a name="STRY-30-230">\(STRY-30-230\)</a>

### Playlist
As EventOwner I want the Playlist with most followers being played by using majority  playlist selection.
<a name="STRY-30-300">\(STRY-30-300\)</a>

As EventOwner I can select which Playlist is being played by using manual playlist select.
<a name="STRY-30-310">\(STRY-30-310\)</a>

As EventOwner I can allow/disallow the same track to be played more then once during my event.
<a name="STRY-30-320">\(STRY-30-320\)</a>

As EventOwner I want the current track to be skipped when the majority of the UserS request SKIP.
<a name="STRY-30-330">\(STRY-30-330\)</a>

As EventOwner,  I want to export the actual playlist after the event so that I am compliant with [GEMA](https://www.gema.de/portal/app/tarifrechner/tariffinder)
<a name="STRY-30-340">\(STRY-30-340\)</a>

As EventOwner, I would like to be able to ensure that at every time, music is  played. The system should provide an emergency playlist in case the current playlist runs empty.
<a name="STRY-30-350">\(STRY-30-350\)</a>

### Statistics
As EventOwner, I would like to see a list of all curators and the number of tracks they have played so I can promote the star curator.
<a name="STRY-30-400">\(STRY-30-400\)</a>

As EventOwner, I would like to see a list of all users and the number of tracks they have contributed and the number of tracks that haven been played so I can promote the star user.
<a name="STRY-30-410">\(STRY-30-410\)</a>

As EventOwner I would like to see a list of all tracks with their like/dislike/skipRequests/ActualySkipped counts so I can promote the most liked/disliked/hated track of the evening.
<a name="STRY-30-420">\(STRY-30-420\)</a>

As EventOwner, I would like to see a statics of my the fun factor of my event over the time, based on feedback of the users during the event.
<a name="STRY-30-430">\(STRY-30-430\)</a>


# NonFunctionalRequirements

## Availability
Music availability during an event is of utmost importance. During an active event, an outage of music for longer then 10 seconds is not acceptable. 
<a name="NFR-10-100">\(NFR-10-100\)</a>

During a single event, music outage can happen at most 1 time.
<a name="NFR-10-110">\(NFR-10-110\)</a>

During an event, the system should be available 99,95% during the event time. Example: During a 6 hour event, the cumulated non-availability time must not be longer than 10 seconds. 
<a name="NFR-10-120">\(NFR-10-120\)</a>

The system should be available 24hx7d - there is always a music event happening somewhere in the world. 
<a name="NFR-10-130">\(NFR-10-130\)</a>

## Response Time
Reactive UI: Response time to user interactions (adding Tracks, re-ordering a playlist etc.) should be very fast. 99% of all responses to interactive requests should be answered <100ms (measured at server side API endpoint)
<a name="NFR-10-200">\(NFR-10-200\)</a>

Seamless transition between tracks with a delay of maximum 100ms.
<a name="NFR-10-210">\(NFR-10-210\)</a>

## Quantity Structure
An event can have up to 3000 participants.
<a name="NFR-10-300">\(NFR-10-300\)</a>

An event is expected to have between 1 and 10 playlists.
<a name="NFR-10-300">\(NFR-10-300\)</a>

An event can last up to 48 hours. Average event duration is 6 hours.
<a name="NFR-10-310">\(NFR-10-310\)</a>

Average track duration is estimated  to be 200 seconds.
<a name="NFR-10-320">\(NFR-10-320\)</a>

There can be hundreds maybe event thounds of events happening concurrently around the world. 
<a name="NFR-10-330">\(NFR-10-330\)</a>


## Networking
Limited networks bandwidth of Clients. All clients (users, curator, musicprovider, eventowner) might share a single WLAN (2.4 GHz, 25MBit bandwidth available to all clients for OpenDJ) with one single 10 MBit uplink to the internet. 
<a name="NFR-10-400">\(NFR-10-400\)</a>

OpenDJ must be usable with public internet - no vpn etc required.
<a name="NFR-10-410">\(NFR-10-410\)</a>

Resilience: temporary outages of WLAN / Internet should be tolerated by the system. 
<a name="NFR-10-420">\(NFR-10-420\)</a>

## Usability
User / Curator UI must be simple and easy to use - assume people are dancing/talking/socializing, adding a track / reordering must be simple, fast and convenient. The people should focus on the event, not the app.
<a name="NFR-10-500">\(NFR-10-500\)</a>

Minor inconsistencies in a playlist view for participants (e.g. not correct order, outdated number of likes/dislikes etc.) are acceptable.
<a name="NFR-10-510">\(NFR-10-510\)</a>

Adaptive UI: UI should respond to different devices orientation (portrait/landscape).
<a name="NFR-10-520">\(NFR-10-520\)</a>


## Security & Privacy
As this solution is going to be available via the public internet, it must be secure. There should be no security vulnerability warnings from GitHub.
<a name="NFR-10-600">\(NFR-10-600\)</a>

If a new base image layer is available due to security fixes, all dependent containers should be re-build and re-deployed immediately and fully automated. Even during live events.
<a name="NFR-10-610">\(NFR-10-610\)</a>

No GDPR relevant data should be stored by the system.
<a name="NFR-10-620">\(NFR-10-620\)</a>

Users should be allowed to be remain completely anonymous.
<a name="NFR-10-630">\(NFR-10-630\)</a>

## Operational Requirements
The whole system should be reachable via  / deployable to a single DNS entry, e.g. *opendj.io* All static content, web pages, API calls etc. must be based of the singe name.
<a name="NFR-10-700">\(NFR-10-700\)</a>

The whole system should be deployable to a OpenShift Online Employee account.
<a name="NFR-10-700">\(NFR-10-710\)</a>
