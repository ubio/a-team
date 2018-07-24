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
        const { label } = pipe.configuration;
        const status = domains.assets.checkPipeStatus(pipe);
        switch (status) {
            case 'UNTRACKED':
                yield {
                    level: 'error',
                    message: `Untracked pipe "${label}" is not allowed`
                };
                break;
            case 'MODIFIED':
                yield {
                    level: 'error',
                    message: `Local modifications to pipe "${label}" are not allowed`
                };
                break;
            case 'OUTDATED':
                yield {
                    level: 'warning',
                    message: `Newer version of "${label}" pipe is available`
                };
                break;
        }
    }
}

