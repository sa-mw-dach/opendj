
# Architecture Principles
1. Cloud Native - ready to scale to handle hundreds of music events with thousands of users each happening in parallel around the world.
1. Style: Micro Services Architecure 
1. Async, Loose coupled, event driven. No polling at all
1. Design should strive for robust and fast implementation (see NFRs)
1. Resilient - Every component should be deployed/scaled to at least 2 instances 
1. no single point of failure
1. Use Red Hat Enterprise Products as much as possible - avoid community upstream projects.


# Architecture Overview Diagram
![aod](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/sa-mw-dach/OpenDJ/master/docs/20architecture/architectureOverview.puml)


# Architectural Decisions

##  Decide on UI Framework 
Discussion took place with [ticket#46](https://github.com/sa-mw-dach/OpenDJ/issues/46)  

Interesting Reads: 
1. [10 Best Responsive HTML5 Frameworks](https://www.webfx.com/blog/web-design/html5-frameworks/) 
1. [Comparison of Vue vs. React vs. Angular]( https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)

### Option A: Ionic/Angular
Use Ionic as UI Component Library with Angular as core framework.

#### Pro
1. Widley adopted
1. Security - CORS / DOM Security embedded, Sanitizer etc.
1. VueJS and React support in development
1. Easy transition to native apps (e.g. iOS/Android)
1. Many native device plugins (TouchID/FaceID, Camera etc...)
1. Switchable look and feel for IOS / Android / Material Design for Browser
1. Service Worker / PWA
1. Existing KnowHow/Expierence in the team

#### Con
1. Download Size?
1. Performance?

### Option B: Vue
#### Description
Use [Vue](https://vuejs.org/).
Investigation did not really happen with [ticket#61](https://github.com/sa-mw-dach/OpenDJ/issues/61)  

#### Pro
1. New and modern
1. Small, slim and slick

#### Con
1. Learning curve
1. No know how in team


### Decision
Daniel decided on 2019-06-19 to go with Option A - Ionic/Angular. New frontend-impl by Ortwin proved to be small and fast, and the available skill in the team is a killer argument. We don't have resource to go through a learning curve.

#  How to handle persistent state 
In the long term, we will need to decide on how/where we persist states (Playlists, Auth Tokens).
Discussion took place with [ticket#8](https://github.com/sa-mw-dach/OpenDJ/issues/8)  

## Option #1: JSON File on RWX PersistentVolume
### Pros
1. easy to implement
1. changes can be easily propagted between pods by obersving the file and re-loading it.
1. easy to debug / fix / change schema (simply look into the file)
### Cons
1.  requires RWX PVC which is not always available (esp. in pub cloud)

## Option #2: In Memory DataBase
Use some in memory databases like Redis, Red Hat JBoss DataGrid etc.

### Pros
1. no disk needed
1. lightnig fast
1. changes can be subscribed to
### Cons
1. - complex to deploy / monitor /operate/debug
1. skills required
 
## Option 3: Use Database on Platform
Use a database like [mongo](https://github.com/sa-mw-dach/OpenDJ/issues/56) / [psql](https://github.com/sa-mw-dach/OpenDJ/issues/55) with corresponding operator.  
*OpenQuestion*: would we use one central deployment instance with schema for each service, or each service with state its own instance?)
### Pros
1. can work with RWO Storage
1. more familiar stuff
### Cons
1. if singleton database (PSQL) could be a single point of failure. Even with operator, the fail over takes several seconds up to minutes.

## Option #4: Use external Database as a Service
For example AWS RDS.
### Pros
1. Very convienet
### Cons
1. No experience
1. Cost
1. Offline development capabilities?

## Option #5:  Use Event Stream Database
Deploy Kafka/AMQ Streams. Each service can emit events on it own topic to store data, either relative delta changes, or absolute state as "high water mark" message.
### Pros
1. Easy to deploy
1. Scales well
1. Worked well in [experiments](https://github.com/sa-mw-dach/OpenDJ/issues/53)
1. Real Cloud Native Design
1.  new red hat technology (AMQ Streams)
1.  works with rwo 
### Cons
1. new technology for most hackers (learning curve)

## Decision
Daniel decided 2019-06-19 for a combination of Option#5 (Kafka) and  Option#3 (database):  
1. We  use Kafka Events as persistence layer as long as possible, because we need async events anyway and works fine for simple key/value persistence as proven by the [experiment](https://github.com/sa-mw-dach/OpenDJ/issues/53)
1. If Kafka is not suited  we use a MongoDB. The deployment is shared by all services, but each service has it's on schema. This simplifies deployment and operation. MongoDB instead of PSQL, because it horizontally scales and does exhibit a single point of failure.

<!--- Template for new Architectural Decision to copy:
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
Description text

### Pros
1. 
1.
### Cons
1. 
1. 

## Decision
Who decided for which option for what reasons on which date?
--->