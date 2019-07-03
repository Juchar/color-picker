@echo off

SET ghPagesBranch=gh-pages
echo Using branch %ghPagesBranch%

git branch -D %ghPagesBranch%
git push origin --delete %ghPagesBranch%
git checkout -b %ghPagesBranch% master

git rm -r --cached .

DEL .gitignore
REN .gitignore-gh-pages .gitignore

call bower cache clean
call bower install --force
call bower prune

git add .

git commit -m "Create GitHub Pages" --no-verify
git push origin %ghPagesBranch% --force
