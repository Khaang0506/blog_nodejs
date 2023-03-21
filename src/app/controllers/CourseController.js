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
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD9QFkahguHM2_ISOBWeVW1UwbaMw`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
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
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //PERMANENTLY DELETE  /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //POST /courses/handleFormActions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({ message: 'Action is invalid!' })
        }
    }

}

module.exports = new CourseController();
