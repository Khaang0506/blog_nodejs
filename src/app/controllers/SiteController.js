const Tests = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    async index(req, res, next) {
        Tests.find({})
            .then(tests => {
                res.render('home',
                    {
                        tests: multipleMongooseToObject(tests)
                    })
            })
            .catch(next)
    }

    //GET  /news/:slug
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
