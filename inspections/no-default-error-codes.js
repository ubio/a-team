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
            const isExpect = info.action && info.action.type === 'expect';
            const level = isExpect ? 'warning' : 'error';
            const message = isExpect ? `Default error code "${info.errorCode}" is used` :
                `Default error code "${info.errorCode}" is not allowed`;
            yield {
                level,
                message,
                context: info.context,
                action: info.action
            }
        }
    }
}

