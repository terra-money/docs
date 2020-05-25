#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd src/.vuepress/dist

echo 'docs.terra.money' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:terra-project/terra-docs.git master:gh-pages

cd -