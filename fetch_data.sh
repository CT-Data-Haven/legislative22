#!/usr/bin/env bash

# download: 
# * data from nhood_data release
# * metadata from scratchpad
# * shapes from scratchpad

datarepo="CT-Data-Haven/legis_profile_data22"
toporepo="CT-Data-Haven/scratchpad"

datatag="viz"
topotag="geos-legis"

gh release download "$datatag" \
  --repo "$datarepo" \
  --dir src/data \
  --clobber

gh release download "$topotag" \
  --repo "$toporepo" \
  --dir src/data/shapes \
  --clobber