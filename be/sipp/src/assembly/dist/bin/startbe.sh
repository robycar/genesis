#!/bin/sh
export JAVA_HOME=/usr/lib/jvm/java-11
PATH=$JAVA_HOME/bin:$PATH
CD="$(dirname $0)"

nohup java -jar "$CD/${project.build.finalName}.${project.packaging}" "--spring.config.location=$CD/../conf/" > "$CD/../logs/out.log" &
