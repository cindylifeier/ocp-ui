#!/usr/bin/env bash
node --max_old_space_size=4096
export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
npm run build && docker build --build-arg PACKAGE_VERSION=$PACKAGE_VERSION -t bhits/ocp-ui:$PACKAGE_VERSION .
