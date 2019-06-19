
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

<!--- Template for new Architectural Decision to copy:
## Problem Statement
Problem desription here

### Option #1: Title
#### Description
text

#### Pros
1. 
1.
#### Cons
1. 
1. 

### Option #2: Title
#### Description
text

#### Pros
1. 
1.
#### Cons
1. 
1. 

## Decision
Who decided for which option for what reasons on which date?
--->