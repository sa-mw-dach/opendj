#! /bin/bash
NAMESPACE="$(oc project -q)"
set -e
ansible-playbook -e namespace=$NAMESPACE ../services/spotify-provider-boundary/openshift/install.yml 
ansible-playbook -e namespace=$NAMESPACE ../services/playlist/openshift/install.yml 
ansible-playbook -e namespace=$NAMESPACE ../services/playbackcontrol/openshift/install.yml 
ansible-playbook -e namespace=$NAMESPACE ../frontend/openshift/install.yml 