const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class MeController {
    //GET  /stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        // if (req.query.hasOwnProperty('_sort')) {
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: req.query.type
        //     })
        // }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
