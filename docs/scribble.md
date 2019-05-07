
# Scribble
This contains unsorted thoughts, ideas which have not yet been sorted into a the right document structure



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


### Persistence
Isnt kafka enough? The last event on the topic? 
Question: how to delete? active message? Timestamp+timeout?


### Are microservices components or subsystems in UML
e.g. the playlist service has two components: the api and a database (e.g. mongo)
How do we describe that in UML?

### Service Discovery: 
Descirption: how does a frontend-service find out which backend-services (backend-spotify, backend-soundclound, backend-itunes) exist and which endpoints they have?
Option A: Env Variables
Option B: some service discovery framework
Option C: query k8s for existing routes/services
Option D: Kafka-Topic
Have a topic where each service provider publishes an event with his name, endpoint urls (internal als .svc.local and external via ocp router), versions etc.. The event is published every time a pod is started.
service consumer can subscribe to the topic and read all messages of the last 24 hours
Option E: Use only async event communicatio, then the only service needed would be the event bus endpoint, which could be in an env variable.


### Service Versioning: 
No breaking changes

# Conventions

## Component names
Convention: ``` <layer>-<component>-<additional> ```


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
