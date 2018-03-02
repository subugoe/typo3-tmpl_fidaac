'use strict';
const assert = require('assert');
const Locator = require('../node_modules/codeceptjs-nightmare/node_modules/codeceptjs/lib/locator');


class ElementNotFound {
    constructor(
        locator, prefixMessage = 'Element',
        postfixMessage = 'was not found by text|CSS|XPath',
    ) {
        if (typeof locator === 'object') {
            locator = JSON.stringify(locator);
        }
        throw new Error(`${prefixMessage} ${(new Locator(locator)).toString()} ${postfixMessage}`);
    }
}

function assertElementExists(res, locator, prefix, suffix) {
    if (!res.value || res.value.length === 0) {
        throw new ElementNotFound(locator, prefix, suffix);
    }
}

class PositionHelper extends codecept_helper {

    async getPositionTop(locator) {
        const res = await this.helpers['WebDriverIO']._locate(locator, true);
        assertElementExists(res, locator);
        const elem = res.value[0];

        const top = await this.helpers['WebDriverIO'].browser.getLocation(locator, 'y');
        return top;
    }

    async getPositionLeft(locator) {
        const res = await this.helpers['WebDriverIO']._locate(locator, true);
        assertElementExists(res, locator);
        const elem = res.value[0];

        const left = await this.helpers['WebDriverIO'].browser.getLocation(locator, 'x');
        return left;
    }

    async getPositionRight(locator) {
        const res = await this.helpers['WebDriverIO']._locate(locator, true);
        assertElementExists(res, locator);
        const elem = res.value[0];

        const left = await this.helpers['WebDriverIO'].browser.getLocation(locator, 'x');
        const width = await this.helpers['WebDriverIO'].browser.getElementSize(locator, 'width');
        const right = left + width;
        return right;
    }
}

module.exports = PositionHelper;
