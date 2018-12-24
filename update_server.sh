#!/bin/bash
#SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
#SCRIPTPATH=$(dirname "$SCRIPT")
#echo $SCRIPTPATH

cd "$(dirname "$0")"
TARGET_DIR=/opt/jsreport/node_modules/jsreport-studio
ssh -t agave-jsreport "find $TARGET_DIR/static/dist -maxdepth 1 -type f -delete"
rsync -avzP ./static agave-jsreport:$TARGET_DIR/
rsync -avzP ./src agave-jsreport:$TARGET_DIR/
rsync -avzP ./jsreport.config.js agave-jsreport:$TARGET_DIR/
rsync -avzP ./package.json agave-jsreport:$TARGET_DIR/
#ssh -t agave-jsreport "cd $TARGET_DIR && npm install --production"
ssh -t agave-jsreport "rm -Rf /opt/jsreport/node_modules/jsreport-licensing"