#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd src/.vuepress/dist

# if you are deploying to a custom domain
echo 'docs2.terra.money' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:terra-project/terra-docs-v2.git master:gh-pages

cd -