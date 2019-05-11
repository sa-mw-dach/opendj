

Issue #24 asks for how we describe event bus interfaces.
This folder contains some testing / proposals for this.

## Option: "Use PlantUML"

### Description
PlantUML can be used to describe async events.
High level in e.g. a component diag could look like this:  

![highlevel](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/sa-mw-dach/OpenDJ/master/docs/00project/eventBusDescription/eventsAsComponentDiag.puml)



On a more fine grained level, it could look like this:
![highlevel](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/sa-mw-dach/OpenDJ/master/docs/00project/eventBusDescription/eventsAsClassDiag.puml)


### Pro:
1. no new tool, we use plantuml already

### Contra:
1. nothing can be generated out of this.



