var chalk   = require('chalk');
var request = require('superagent');
var Promise = require('bluebird');
var cache   = require('memory-cache');
var format  = require('string-template');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} context
 */
var client = function (context) {
    return {
        // Fetch sunset and coordinate info
        info: function (params) {
            // If city info is not provided, no backend info is needed
            if (!params.city || params.city.length === 0) {
                return Promise.resolve();
            }

            var cacheKey = format('time.info.{timezone}.{city}', params);
            if (cache.get(cacheKey) !== null) {
                return new Promise(function (resolve) {
                    resolve(cache.get(cacheKey));
                });
            }

            return request.get('http://api.openweathermap.org/data/2.5/weather?q=' + params.city)
                .promise()
                .then(function (res) {
                    // Check if response seem valid
                    if (!res.body.sys) {
                        context.logger.error(chalk.red('Failed to find location info for', params.city));
                        return res.body
                    }
                    // Cache the response for 12h hours
                    cache.put(cacheKey, res.body, 43200000);
                    return res.body;
                });
        }
    };
};

module.exports = client;