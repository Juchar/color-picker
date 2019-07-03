@echo off

SET ghPagesBranch=gh-pages-new
echo Using branch %ghPagesBranch%

git branch -D %ghPagesBranch%
git push origin --delete %ghPagesBranch%
git checkout -b %ghPagesBranch% master

call bower install

git rm -r --cached .
DEL .gitignore
REN .gitignore-gh-pages .gitignore
git add .

git commit -m "Create GitHub Pages" --no-verify
git push origin %ghPagesBranch%
