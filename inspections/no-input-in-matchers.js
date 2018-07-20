'use strict';

const pipeTypes = ['value/get-input', 'value/get-input-stages'];

module.exports = {
    scope: 'action',
    name: 'No Input In Matchers',
    domains: [],
    inspect
};

function* inspect(action) {
    if (action.type !== 'matcher') {
        return;
    }
    for (const pipe of action.allPipes()) {
        if (pipeTypes.includes(pipe.type)) {
            yield {
                level: 'error',
                message: `Input "${pipe.inputKey}" should not be accessed in matcher`
            };
        }
    }
}

