#!/bin/sh

CD=$(dirname $0)

docker build -t genesis_fe:latest $CD
