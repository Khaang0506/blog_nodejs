const Tests = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
const Course = require('../models/Course')

class CourseController {
    //GET /course/:slug
    show(req, res, next) {
        Tests.findOne({ slug: req.params.slug })
            .then(test => {
                res.render('courses/show', { test: mongooseToObject(test) })
            })
            .catch(next)
    }

    //GET /course/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //POST /course/create
    store(req, res, next) {
        const formData = req.body
        console.log(formData);
        formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD9QFkahguHM2_ISOBWeVW1UwbaMw`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            })
    }
}

module.exports = new CourseController();
