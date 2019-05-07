# UI
Description of user interfaces/experience, to be augemnted with prototpyes.

## Landing 
Welcome page with options to:
* Join a private event by entering the ID 
* Join a public event from the list of active public events
* Create and Event

## JoinEvent
Ask for UserName (Optional)
Or Register with Social Media (OPtional)

## UserView 
Target: small mobile device
Fields:
* First Block - Playlist (always visible)  
    If multiple playlist exists, arrows to left and right of the block. Swiping on the playlist name switches list.
    Inside the Block:
    * First Line: Current Playlist Name. 
    * Second Line: 
        * Motto of playlist or event (if playlist has no mottot)
        * Number of followers of that list (equal to the number of users if there is only one playlist). 
        * Button "Follow" / unfollow a list if there are multiple.

* Second Block - Now Playing  
    Show the current track
    * Logo Image
    * First Line: Track Name, Artits Name
    * Second Line: Added by <UserName>, SKIP Button with small xxx/yyy numbers (xxx: number of skip request, yyy: number of skip requests required)
    * Progress Bar
     
* Center Block: Playlist  
    Scrolling per swipe if list is longer than space available.  
    If user is curator for current playlist, re-ordering per drag and drop is possible.
    Per Entry: 
    * Image Icon 
    * Track Name 
    * Artist 
    * Optional Album name / year, if space permits. maybe as 2nd line. Could als be reactive, if user switches from portrait to landscape.
    * ETA - HH:MM when this track will be played, assuming playlist will not be modified. 
    * Like/Dislike button. If user liked the track, like button is green. if user disliked track, dislike button is red. Next to the like/dislike buttons is a small number shown with the counter (constantly update as users like/dislike).  


* Bottom BLock:
    *ADD  button leading to "AddTrackDialog"

## Add Track Dialog 
Modal Popup
* Top Block  
    Text Input Field: (Embedded Hint that disappers on first input: Track Name, Artist, MusicProvider URL/ID). Search is executed on de-focus
* Center Block   
    Search Results List. If only one hit (e.g. with spotify link), that hit is auto-selected. 
* Bottom Block  
    Button "ADD" 

Adding the track can fail, e.g. track URL/ID not found, or track has been played and duplicates are not allowed. Error message is displayed.


## Curator View
Target: Tablet
Very much like User View, adding:
- More Infos about a Track (BPM, Danceability, Year, Genre, ...)
- Duplicate Warning Flag
- re-ordering per drag and drop
- deleting
- TrackIdeas: click on them opens search dialog to replace with actual track


## Menu
Menu in upper Left Corner Block with three Bars (like android), always visible.  
On Selection - depending on Role and Permissions:
- Create New Playlist
- Request Curator
- ----Separator----
- User View
- Curator View 
- Event View
- ----Separator----
- Edit Event Setting
- Leave Current Event
- Edit Profile

## PopUps / Noftications
There might be the requirement for notifactions, e.g. if a User request becoming Curator for the current Playlist, all Curatios might receive a popup/pus notification to accept that requuest. 

## EditEvent
Fields:
- Access Code: String (if access code already used, error message is displayed)
- User Authentication required: yes/no (then users MUST log in)
- Motto of event (string)
- Everybody is a curator: yes/no
- Track Duplicates Allowed: yes/no
- Playlist Selection: Automatic by majority of users / Manual by EventOwner
- Add Spotify Provider
- If PSpotify Provider added: Select Spotify Device from drop down list of available devices
- Spotify Playlist To Add Played Tracks to: Name of List (will be created if not existing)


# Event Statistics View
For Star Curator, Star User and Star Track


