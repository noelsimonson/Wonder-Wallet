# Wonder Wallet

*Overview*

Something something something.....

_Branching Strategy_

Step 1 -  Clone the new repo to your computer:
_git clone https://github.com/EArbeitman/Project2_

Step 2 - Pull and checkout the develop branch
_git pull origin develop_

*This will give you a copy of all the code pushed to develop so far. The develop branch
will consist of all individual changes we make. Since this is a small project, we will be working on the same files and we will run into merge conflicts.*

Step 3 - Create a local branch off of develop:
_git checkout -b evansBranch_ (substitute your name)

All of your work for that day will be tracked under your branch

Step 4 - Merge changes into develop

	a. Once you are finished with your work for the day, stage and commit your changes on your local branch. For example

_git add file1, file2_
_git commit -m "Changed feature abc"_

NOTE: Do not push at this step. You could create a remote copy of your branch by doing this:
_git push -u origin evansBranch_
Afterwards, you could create a pull request to merge your code into develop. Instead, let's do this:

Step 4 continued...
1. git checkout develop _Switch to your local copy of the develop branch_
2. git fetch _Bring down all remote branches_
3. git merge origin/develop _Merge code in remote branch into your local branch_
4. git merge develop yourBranch _you may get merge conflicts here, which is okay_

You can reconsile merge conflicts by validating the changes with a partner. 

---------------------------------------------------------------------

Resources:

GIT Tutorial: https://www.atlassian.com/git/tutorials
Slick Framework: http://kenwheeler.github.io/slick/
Morris Charts: http://morrisjs.github.io/morris.js/
Animate CSS: https://github.com/daneden/animate.css
NodeJS Passport tutorial: https://www.youtube.com/playlist?list=PLZm85UZQLd2Q946FgnllFFMa0mfQLrYDL
Plaid bank connection API: https://plaid.com/





