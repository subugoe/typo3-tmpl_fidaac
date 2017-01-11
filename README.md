Base Sitepackage for the project Typo3TmplFidaac
==============================================================

Here, all configuration for Typo3 is combined, frontend and backend.


### Testing

There are tests for 3 instances of the website:
* Local installation
* Old Live server
* Development server

Each instance can be tested seperately, or all can be tested
in one chunk.
* Local installation: "npm run testLocal"
* Old Live server: "npm run testOldLive"
* Development server: "npm run testDev"

To run the tests, you must have npm installed. The best way to do
that is to install nvm first, and ask nvm to use the correct version
of npm. Than let npm install all necessary libraries and run
the tests.

* For installation of nvm, please refer to
 https://github.com/creationix/nvm
* Choose the correct nvm version: "$ nvm install 6.0"
* Install all necessary libraries: "$ npm install"
* Run a test: "$ npm run testLocal"
