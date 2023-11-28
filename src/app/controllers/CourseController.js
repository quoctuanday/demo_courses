const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { param } = require('../../routes/courses');

class CourseController {
    show(req, res, next) {
        Course.find({})
            .then(courses => {
                Course.findOne({ slug: req.params.slug })
                    .then(singleCourse => {
                        res.render('courses/show', {
                            courses: multipleMongooseToObject(courses),
                            singleCourse: mongooseToObject(singleCourse), // Đối tượng kết quả từ findOne
                        });
                    })
                    .catch(next);
            })
            .catch(next);

        // Course.findOne({ slug: req.params.slug })
        //     .then(course => {
        //         res.render('courses/show', {
        //             course: mongooseToObject(course),
        //         });
        //     })
        //     .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create');
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    //[PUT] /courses/:id

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PUT] /courses/:id
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {});
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } }) //Xóa tất cả những item có id giống trong list req.body.courseIds
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDestroy':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Invalid action' });
        }
    }
}

module.exports = new CourseController();
