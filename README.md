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
* Testing locally with Selenium
  * `npm run testPrepareSelenium` to start the server
  * `npm run testSeleniumChrome` to start the test
* Testing in the cloud with browserstack
  * write `export BROWSERSTACK_USERNAME="yourBrowserstackUsername` in .bashrc
  * write `export BROWSERSTACK_ACCESS_KEY="yourBrowserstackKey"` in .bashrc
  * `npm run testPrepareBrowserstack` to start the tunnel
  * `npm run testBrowserstack` to start the Testsuite with Chrome, Firefox and IE
