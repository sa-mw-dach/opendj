# Analysis Model
A rather traditional UML analysis model describing entities and their relationships. Please note that this is just to define names and terms, and get a better understanding of the solution domain.  

Which entities need to be persistent, how associations are implemented, and so on, we will see later.  

Comments and details are below the diagram.

Here it is:

![model](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/sa-mw-dach/OpenDJ/master/docs/10requirements/analysisModel/analysismodel.puml)


## User
Users of the system. A User can be in different Roles. The roles are not modeled explicitly to keep it simple. They are defined implicitly through associations. Let's UserRoles explicit here: 
- **Contributers** add ListItems to Playlists
- **Curators**  modify Playlists
- **EventOwners** provider their SpotifyAccount to playback music, and are in charge of of the whole music event.

## ListItem
The idea of the ListItem is to de-couple the Tracks from the Playlist.
In a single Event, the same track can occur in different Playlists, with different Likes and hates etc. 

## ListItemIdea
Just an Abstract idea, not associated with an actual track. To be replaced by the Curator with an actual track.
See [STRY-10-270](100requirements.md#STRY-10-270)


## MusicEvent --> MusicBackend
A single Event can have multiple backends, e.g. Spotify, iTunes etc. But only one backend per provider type. An Event can have only one SpotifyBackend. Otherwise, it would be unclear on which device to play the track. 


## Tenant
Multi-tenancy will be probably implemented using distinct deployments of the system. But as this is hard to introduce later, it is modeled explicitly. 

