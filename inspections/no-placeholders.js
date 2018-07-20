'use strict';

module.exports = {
    scope: 'action',
    name: 'No Placeholders',
    domains: [],
    inspect
};

function* inspect(action) {
    if (action.type === 'placeholder') {
        yield {
            level: 'error',
            message: 'Placeholders are not allowed'
        };
    }
}

