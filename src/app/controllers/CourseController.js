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

    //GET /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)

    }

    //PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //DELETE /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController();
