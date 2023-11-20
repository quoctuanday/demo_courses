const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
    //Duoc thay bang dong duoi
    app.use('/news', newsRouter);
    app.use('/me', meRouter);

    app.use('/courses', coursesRouter);

    // app.get('/search', (req, res) => {
    //     // console.log(req.query.q);
    //     res.render('search');
    // });

    // app.get('/', (req, res) => {
    //     res.render('home');
    // });
    app.use('/', siteRouter);
    // app.post('/search', (req, res) => {
    //     // console.log(req.body.q);
    //     res.render('');
    // });
}

module.exports = route;
