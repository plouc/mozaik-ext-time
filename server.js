'use strict'

const path = require('path')
const Mozaik = require('@mozaik/server')

Mozaik.configureFromFile(path.join(__dirname, 'config.yml'))
    .then(config => {
        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })
