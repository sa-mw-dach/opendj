# Architectural Decisions Document


#  How do we detect the end of a track and start the next one

## Problem Description
Situation: Track is playing
We have multiple pods running the spotify provider for a single event for HA reasons.

## Option A: All pods poll spotify
### Description
Every provider pod polls spotify API every second to check if track is still playing (for every active vent)
### Pros
### Cons
1. Does not scale to large number of events - rate limits might apply
1. Latency of worst case 1s to dected finish violates NFRs.

## Option B: Single pod timer
### Description
Let's asume "PLAY" is an sync REST call. The pod receiving that call creates an internal timer that fires at the end of the song. When the timer expires, an TRACK_FINISHED event is fired.
### Pros
1. Very Simple
1.
### Cons
1. Does not detect if track is stopped / skipped via spotify direcly. That is prohibited, but the system should recover from these type of conditions.
1. If that pod dies for whatever reasons during playback, the event is missed, so no next song would be played, violating NFRs


## Option C: all pods timer
### Description
Let's asume "PLAY" is an async EVENT, received by all pods (in case of a sync REST call, event could be fired by the receiving pod). All pods receiving that call creates an internal timer that fires at the end of the song. When the timer expires, an TRACK_FINISHED event is fired.
### Pros
1. Very Simple
1. 
### Cons
1. In case we would loose ALL pods, the stopping of a track would be missed, so no next song would be played, violating NFRs
1. Event will be fires multiple times. Idempotency would be needed on receiving side to avoid double action. So basically we just delegate the problem to a different layer.


## Option D: singleton pod with timer and backup polling
### Description
Use kafka consumer groups with key on eventID to make sure "PLAY" event is received only by a single POD. 
That pod creates an in memory timer to fire a "STOPPED" event at the end of the track.
If the pod dies, another pod is acticated by kafka. That new pod would receive the last "PLAY" event and could then check with spotify to make sure the track is still playing, re-creating the in memory timer.
As additional backup and to dected manual interventions using the spotify ap, the singleton pod that is active for that event could poll the spotify API once a second to make sure the track is actually still playing. if not, a "STOPPED" event would be fired, causing the next track to be played.

### Pros
1. 
1.
### Cons
1. Depends heavily on kafaka
1. 




## Open Questions
### Determine Spotify API rate limits
### Try kafka consumer group singletons 
Make sure multiple pods receiving on the same topic+key (eventID) only one receives.
Determine failover times in case of pod failure.
Make sure last event is consumed by new pod after failover



## Decision
Current tendecy to rely on kafka singleton event processing. seems to nicely delegate the problem to proven technology.


TOPIC -> PART 4 -> CG 1




# Problem Statement
Problem desription here

## Option #1: Title
### Description
text

### Pros
1. 
1.
### Cons
1. 
1. 

## Option #2: Title
### Description
text

### Pros
1. 
1.
### Cons
1. 
1. 

## Decision
Who decided for which option for what reasons on which date?
