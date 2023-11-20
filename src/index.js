const path = require('path');
const handlebars = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

//Connect to DB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

//Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
//HTTP logger
// app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Router init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
