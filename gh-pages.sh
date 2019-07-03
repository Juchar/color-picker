#!/bin/bash -e

ghPagesBranch=gh-pages
echo "Using branch $ghPagesBranch"

git branch -D $ghPagesBranch
git push origin --delete $ghPagesBranch
git checkout -b $ghPagesBranch master

git rm -r --cached .

call bower cache clean
call bower install --force
call bower prune

rm .gitignore
mv .gitignore-gh-pages .gitignore

git add .

git commit -m "Create GitHub Pages" --no-verify
git push origin $ghPagesBranch --force
