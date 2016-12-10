const gulp = require('gulp')
const _    = require('lodash')

// load mozaïk module tasks
_.forOwn(require('mozaik/gulpfile').tasks, task => {
    gulp.task(task.name, task.dep, task.fn)
})
