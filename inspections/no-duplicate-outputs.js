'use strict';

module.exports = {
    scope: 'script',
    name: 'No Duplicate Outputs',
    domains: [],
    inspect
};

function* inspect(script, domain) {
    const outputsByKey = new Map();
    for (const action of script.allActions()) {
        if (action.type !== 'output') {
            continue
        }
        if (action.stageKey) {
            continue;
        }
        const outputs = outputsByKey.get(action.outputKey);
        if (outputs) {
            outputs.push(action);
        } else {
            outputsByKey.set(action.outputKey, [action]);
        }
    }
    for (const actions of outputsByKey.values()) {
        if (actions.length > 1) {
            for (const action of actions) {
                yield {
                    level: 'warning',
                    message: `Output "${action.outputKey}" emitted more than once`,
                    action
                };
            }
        }
    }
}

