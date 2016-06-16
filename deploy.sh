#!/bin/bash

# Fetch current time
export TZ=":America/New_York"
now=$(date +"%Y-%m-%d %H:%M:%S")

# Build the site
cd /Users/dlunev/projects/integrationagent/depositfix-site
hugo

# Push the source to Github (source branch)
git add .
git commit -m "Site update: $now"
git push origin master

# Push the compiled HTML to Github (master branch)
yes | cp -rf public/* deploy
cd deploy
git add .
git commit -m "Site update: $now"
git push origin gh-pages