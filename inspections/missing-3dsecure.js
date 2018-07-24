'use strict';

module.exports = {
    scope: 'script',
    name: 'Missing 3dsecure',
    domains: [],
    inspect
};

function* inspect(script) {
    for (const action of script.allActions()) {
        if (action.type === '3dsecure') {
            return;
        }
    }
    yield {
        level: 'warning',
        message: 'Missing 3D Secure'
    };
}

