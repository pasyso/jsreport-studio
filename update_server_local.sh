#!/bin/bash
#SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
#SCRIPTPATH=$(dirname "$SCRIPT")
#echo $SCRIPTPATH

cd "$(dirname "$0")"
TARGET_DIR=/opt/jsreport/node_modules/jsreport-studio
find $TARGET_DIR/static/dist -maxdepth 1 -type f -delete
cp -Rf ./static $TARGET_DIR/
cp -Rf ./src $TARGET_DIR/
cp -Rf ./jsreport.config.js $TARGET_DIR/
cp -Rf ./package.json $TARGET_DIR/
chown -Rf jsreport:jsreport $TARGET_DIR
cd $TARGET_DIR && npm install --production
rm -Rf /opt/jsreport/node_modules/jsreport-licensing
