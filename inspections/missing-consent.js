'use strict';

module.exports = {
    scope: 'script',
    name: 'Missing Consent',
    domains: [],
    inspect
};

function* inspect(script) {
    for (const action of script.allActions()) {
        if (action.type === 'consent' &&
            action.inputKey === 'finalPriceConsent' &&
            action.outputKey === 'finalPrice') {
            return;
        }
    }
    yield {
        level: 'error',
        message: 'Missing Price Consent'
    };
}

