const Course = require('../../models/Course');
const {handleErrors} = require('../helpers/handel-errors');

class CustomerController {

    // [GET] /customer/stored/courses
    storedCourses(req, res) {
        let sort = {
            sort: req.query._sort || 'id',
            order: req.query.order || 'desc',
        };
        Course.getAll('', (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render('customer/stored-courses', {
                    courses: data,
                    entity: 'courses'
                });
            }
        }, sort);
    }

}

module.exports = new CustomerController();
