const Course = require('../../models/Course');
const {handleErrors} = require('../helpers/handel-errors');

class CustomerController {

    // [GET] /customer/stored/courses
    storedCourses(req, res) {
        Course.getAll('', (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render('customer/stored-courses', {
                    courses: data,
                    entity: 'courses'
                });
            }
        });
    }

}

module.exports = new CustomerController();
