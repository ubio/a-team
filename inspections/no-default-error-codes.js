'use strict';

const DEFAULT_ERROR_CODES = [
    'expectationFailed',
    'assertionFailed',
    'failure'
];

module.exports = {
    scope: 'script',
    name: 'No Default Error Codes',
    domains: [],
    inspect
};

function* inspect(script) {
    for (const info of script.collectErrorCodesInfo()) {
        if (DEFAULT_ERROR_CODES.includes(info.errorCode)) {
            yield {
                level: 'warning',
                message: `Default error code "${info.errorCode}" is not allowed`,
                context: info.context,
                action: info.action
            }
        }
    }
}

