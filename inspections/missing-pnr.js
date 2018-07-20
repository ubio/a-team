'use strict';

module.exports = {
    scope: 'script',
    name: 'Missing PNR',
    domains: [],
    inspect
};

function* inspect(script) {
    for (const action of script.allActions()) {
        if (action.type === 'pnr') {
            return;
        }
    }
    yield {
        level: 'error',
        message: 'Missing PNR'
    };
}

