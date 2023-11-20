const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET]/
    // CAllBACK
    //async index(req, res) {
    //     try {
    //         const courses = await Course.find({});
    //         res.json(courses);
    //     } catch (error) {
    //         res.status(400).json({ error: 'ERROR!!!' });
    //     }

    //     // res.render('home');
    // }

    //Promises
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                //Sử dụng dòng bên dưới để giải quyết vấn đề
                //ko sử dụng được this.image trực tiếp do lớp bảo mật của hbs
                //courses = courses.map((course) => course.toObject());
                //Hoặc sử dụng multipleMongooseToObject được định nghĩa sẵn để dùng và thêm
                //vào sau courses
                res.render('home', {
                    //courses: courses, (Khi viết 2 đối số giống nhau
                    //thì có thể viết mỗi courses)
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
