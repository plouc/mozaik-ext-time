require('babel-register')({
    only: [
        /node_modules\/mozaik[^/]*\/src/,
        /src\/server\.js/,
        /config\.js/
    ]
})

const mozaik = require('./src/server')
