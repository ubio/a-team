'use strict';

module.exports = {
    scope: 'script',
    name: 'Collect Error Codes',
    domains: [],
    inspect
};

function* inspect(script) {
    const errorCodesInfo = Array.from(script.collectErrorCodesInfo());
    const errorCodes = new Set(errorCodesInfo.map(_ => _.errorCode));
    yield {
        level: 'info',
        message: 'Error codes',
        details: {
            codes: Array.from(errorCodes)
        }
    };
}

