const Tests = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class MeController {
    //GET  /stored/courses
    storedCourses(req, res, next) {
        Course.find({}).then(course => res.render('me/stored-courses', {
            courses: multipleMongooseToObject(course)
        }))
            .catch(next)

    }
}

module.exports = new MeController();
