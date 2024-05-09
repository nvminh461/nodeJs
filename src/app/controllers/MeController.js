const Course = require('../../models/Course');
const {handleErrors} = require('../helpers/HandleErrors');

class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res) {
        Course.getAll('', (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render('me/stored-courses', {
                    courses: data
                });
            }
        });
    }

}

module.exports = new MeController();
