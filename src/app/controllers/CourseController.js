const Course = require('../../models/Course');
const handleErrors = require('../helpers/HandleErrors');

class CourseController {
    // [GET] /
    index(req, res) {
        Course.getAll('', (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.render('courses/course', {
                    courses: data
                });
            }
        });
    }

    // [GET] /courses/:slug
    show(req, res) {
        Course.getBySlug(req.params.slug, (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.render('courses/course-detail', {
                    course: data
                });
            }
        });
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res) {
        const course = new Course({
            name: req.body.name,
            description: req.body.description,
            videoId: req.body.videoId,
        });

        Course.create(course, (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.redirect('/courses');
            }
        });
    }
}

module.exports = new CourseController();
