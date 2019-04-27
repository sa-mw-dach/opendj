Contains ansible playbook to deploy this component to OpenShift. Creates Build/Deployconfig and neccessary additional artefacts.
Needs an ansible variable "namespace" which defines into which project/namespace the deployment shoud go to.
Uses ansible k8s modules against localhost, which means that before executing the playbook, you must be "oc login"ed.
Example:
~~~~
> ansible-playbook -e namespace=dfroehli-opendj-dev install.yml 
~~~~
