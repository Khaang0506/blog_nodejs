const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class MeController {
    //GET  /stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([course, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount: deletedCount,
                    courses: multipleMongooseToObject(course),
                }))
            .catch(next)
    }

    //GET  /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}).then(course => res.render('me/trash-courses', {
            courses: multipleMongooseToObject(course)
        }))
            .catch(next)
    }
}

module.exports = new MeController();
