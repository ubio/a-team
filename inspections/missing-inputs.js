'use strict';

module.exports = {
    scope: 'script',
    name: 'Missing Inputs',
    domains: [],
    inspect
};

function* inspect(script, domain) {
    const inputKeys = new Set(script.collectInputKeys());
    const missingInputs = [];
    for (const def of domain.getInputs()) {
        if (!inputKeys.has(def.key)) {
            missingInputs.push(def.key);
        }
    }
    if (missingInputs.length) {
        yield {
            level: 'warning',
            message: 'Missing inputs',
            details: {
                keys: missingInputs
            }
        };
    }
}

