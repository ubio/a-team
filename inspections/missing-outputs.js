'use strict';

module.exports = {
    scope: 'script',
    name: 'Missing Outputs',
    domains: [],
    inspect
};

function* inspect(script, domain) {
    const outputKeys = new Set(script.collectOutputKeys());
    const missingOutputs = [];
    for (const def of domain.getOutputs()) {
        if (!outputKeys.has(def.key)) {
            missingOutputs.push(def.key);
        }
    }
    if (missingOutputs.length) {
        yield {
            level: 'warning',
            message: 'Missing outputs',
            details: {
                keys: missingOutputs
            }
        };
    }
}

