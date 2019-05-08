#!/bin/bash

generate() {
  SWAGGER_FILE_PATH=$1
  NG_VERSION=$2
  swagger-codegen generate -l typescript-angular -i $SWAGGER_FILE_PATH --additional-properties ngVersion=$NG_VERSION
}

generate $1
