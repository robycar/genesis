@ECHO OFF

SETLOCAL ENABLEEXTENSIONS
SET HOME=%~dp0

docker build -f "%HOME%Dockerfile-package" -t bebuild "%HOME%sipp"

docker run -it --rm --mount "type=bind,source=%HOME%sipp,target=/app" bebuild

