'use strict';

module.exports = {
    scope: 'action',
    name: 'No Untracked Pipes',
    domains: [],
    inspect
};

function* inspect(action) {
    for (const pipe of action.allPipes()) {
        if (pipe.type !== 'other/custom') {
            continue;
        }
        if (!pipe.configuration.integrity) {
            yield {
                level: 'error',
                message: `Untracked pipe "${pipe.configuration.label}" is not allowed`
            };
        }
    }
}

