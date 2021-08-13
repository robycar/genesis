#!/bin/sh

SCRIPTDIR=$(realpath $(dirname $0))
echo SCRIPTDIR: $SCRIPTDIR

docker build -f "$SCRIPTDIR/Dockerfile-package" -t bebuild "$SCRIPTDIR/sipp" && \
docker run -it --rm --mount "type=bind,source=$SCRIPTDIR/sipp,target=/app" bebuild


