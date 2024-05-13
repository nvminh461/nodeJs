const Course = require('../../models/Course');
const handleErrors = require('../helpers/handel-errors');

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
        res.render('courses/form', {
            action: 'create'
        });
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
                res.redirect('/customer/stored/courses');
            }
        });
    }

    // [GET] /courses/:id/edit
    edit(req, res) {
        Course.findById(req.params.id, (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.render('courses/form', {
                    action: 'edit',
                    course: data
                });
            }
        });
    }

    // [PUT] /courses/:id/update
    update(req, res) {
        const id = req.params.id;

        const course = new Course({
            id: id,
            name: req.body.name,
            description: req.body.description,
            videoId: req.body.video_id,
        });

        Course.updateById(id, course, (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.redirect('/customer/stored/courses');
            }
        });
    }

    // [DELETE] /courses/:id
    delete(req, res) {
        Course.remove(req.params.id, (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.redirect('/customer/stored/courses');
            }
        });
    }

    // [DELETE] /courses/:id/massDelete
    handleFormActions(req, res) {
        switch (req.body.action) {
            case 'delete':
                Course.removeByIds(req.body.courseIds, (err, data) => {
                    if (err) {
                        handleErrors.handleErrors500(err, res);
                    } else {
                        res.redirect('/customer/stored/courses');
                    }
                });
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }
}

module.exports = new CourseController();
