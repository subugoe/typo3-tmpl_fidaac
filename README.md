# TYPO3 Template for the Library of Anglo-American Culture & History

Extension template for https://github.com/subugoe/site-aac


## Installation:

* Install site-aac from Github page https://github.com/subugoe/site-aac, typo3-tmpl_fidaac is included.


## Software requirements:
* docker >= 17.05
* docker-compose >= 1.15
* composer >= 1.3.1
* nvm >= 0.33 (optional)
* npm 8


## Other typo3 extension used:
* pazpar2
* vhs
* powermail
* nkwgok

## Testing

Testing is done with codeceptjs and webdriverio.
* The tests are run agains extra pages which are loaded into the database with `./import-testpages.js` in the site_aac directory 
* Use `npm run testPrepare` to start selenium server
* Use `npm run test` to run the tests 
