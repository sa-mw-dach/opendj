
# Scribble
This contains 
- unsorted thoughts, ideas which have not yet been sorted into a the right document structure
- random notices


## Architecture Questions:

### Layering I
is the client allowed to directly call a low level, e.g. frontent-web call spotify-backed?
Option A: yes
Example: EventRegistration Page calls backend-spotify to retrview auth-url 
Pro: 
+fast: several backends can be queried by the browser in parallel
+de-coupling of microservers - no deep call chain of A->B->C->D
- coupling of frontend to various deeper layers of the architecture

### Layering II
Layers:
1. frontend 
Contains all UX/UI relevant stuff that actually runs on the client (HTML, Android App), not on sever.  
**??? Good Idea???** HTML needs to be served by Server!!!  
Examples:
    - frontend-browser-ui  
    - frontend-app-android (if we need one later)
1. services-frontend 

### Layering III
We need to de-couple the frontend from the services, e.g. for converting internal kafka event streams to websockets, isolate changes.
Options:
1. [Backend for Frontend](https://docs.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) - dedicated backend per frontend type (web, app)
1. [Gateway Aggregration](https://docs.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation) 

I think we need a "Backend For Frontend" Facade, aka "Mobile Backend as a Service". 
Responsibilties:
- Auth checking
- mapping of internal kafka events to websockets

## WebSockets I
Use websockets for client/server async events, or bring kafka out to the client?

Con:
1. Kafaka protocol is binary, more complex to get it through routers, load balancers
1. Security?

## WebSockets II
If we use websockets and have a BFF


### Persistence
Isnt kafka enough? The last event on the topic? 
Question: how to delete? active message? Timestamp+timeout?


### Are microservices components or subsystems in UML
e.g. the playlist service has two components: the api and a database (e.g. mongo)
How do we describe that in UML?

### Service Discovery: 
Description: 
How does a frontend service find out which backend services exist and which endpoints they have?  

Example: How does the EventService find out, which musicproviders are avail?
Could be backend-spotify, backend-soundclound, backend-itunes, or non of these.

Ideas:
- Option **A**: Env Variables
- Option **B**: some service discovery framework
- Option **C**: query k8s for existing routes/services
- Option **D**: Kafka-Topic  
    Have a topic where each service provider publishes an event with his name, endpoint urls (internal as xxx.svc.local and external via ocp router), versions etc..  
    The event is published every time a pod is started or every 12 hours. Thus consumers can read the topic -12 hours and know who might be there. To get final confidence, consumer can call the /health endpoint to verify - *et voilá*.  
- Option **E**: Use only async event communications, then the only service needed would be the event bus endpoint, which could be in an env variable.


### Service Versioning
How do we handle service versioning.
Idea:
- use ..../v1  in path (like k8s does) until there is a breaking change. then increase to v2
- avoid breaking changes like hell - no mandatory fields in any api or event!


- Principal: No breaking changes
- Principal: no mandatory fields in messages.


# Conventions

## Component names
Convention: ``` <layer>-<component>-<additional> ```


## URI Paths and API Endpoints
- static UI stuff: /**ui**/*<component>*/...
  Examples: 
    - www.opendj.io/ui/web/img/logo.png
    The only exception to this rule is the landing page *www.opendj.io* which is served directly from there.


- APIs: /**api**/*<component>*/...
  Examples:
    - www.opendj.io/api/service-playlist/get 
    - www.opendj.io/api/backend-spotifyprovider/spotifyPleaseCallbackHereAfterUserConsent



***???*** 
Not sure if this is really a good idea - if you have a single component service both static stuff and api, you need two routes in OpenShift to get the traffic to that component. Better would be:
/**<component>**/*ui*/...
/**<component>**/*api*/...







git structure: 
-docs
--meta
--project management
--requirements
--architecture
--design
--implementation
--deployment
--operation

-components
--<component name>
---docs
---src
---deploy


# Container Registry
Use Quay as registry to transport components between environments

## Install kafka on mac:
```bash
# Install:
brew install kafka

# Make sure jdk 1.8 is selected:
jenv local openjdk64-1.8.0.212

# Get Logs from latest deployment:
oc logs -f dc/spotify-provider-boundary

# Run:
zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties &
kafka-server-start /usr/local/etc/kafka/server.properties

# Delete topic:
kafka-topics --bootstrap-server localhost:9092 --delete --topic opendj-spotifyprovider-internal
```

# GIT
## Reference issues in other repo:
sa-mw-dach/OpenDJ#53
sa-mw-dach/OpenDJ#64


# Spotify API
Registered Callbacks in Spotify Developer Dashboard for OpenDJ App:
http://www.opendj.io/backend-spotifyprovider/auth_callback
http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/backend-spotifyprovider/auth_callback
http://localhost:8081/backend-spotifyprovider/auth_callback

# provider api:

# first: get login url:
http://localhost:8080/backend-spotifyprovider/getSpotifyLoginURL?event=4711
http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/backend-spotifyprovider/getSpotifyLoginURL?event=4711


# second: (copy paste that URL to antoher tab and see how spotify consent screen), then call back

# third:
http://localhost:8080/backend-spotifyprovider/getCurrentTrack?event=4711
http://localhost:8080/backend-spotifyprovider/getAvailableDevices?event=4711


http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/backend-spotifyprovider/getCurrentTrack?event=4711
http://spotify-provider-boundary-dfroehli-opendj-dev.apps.ocp1.stormshift.coe.muc.redhat.com/backend-spotifyprovider/getAvailableDevices?event=4711




