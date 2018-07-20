'use strict';

module.exports = {
    scope: 'context',
    name: 'No Contexts Without Matchers',
    domains: [],
    inspect
};

function* inspect(context) {
    if (context.type !== 'context') {
        return;
    }
    if (!context.matchers.length) {
        yield {
            level: 'error',
            message: `Context contains no matchers`
        };
    }
}

