/**
 * Mozaïk time widgets sample config.
 */
require('dotenv').load();


const config = {
    env:  'prod',

    host:             '0.0.0.0',
    port:             process.env.PORT || 5000,
    useWssConnection: process.env.USE_SSL === 'true',

    theme: 'night-blue',

    api: {},

    rotationDuration: 10000,

    dashboards: [
        {
            columns: 3,
            rows:    2,
            widgets: [
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 0, y: 0
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 1, y: 0
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 2, y: 0
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 0, y: 1
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 1, y: 1
                },
                {
                    type: 'time.clock',
                    columns: 1, rows: 1,
                    x: 2, y: 1
                },
            ]
        }
    ]
}


module.exports = config
