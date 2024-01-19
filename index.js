const express = require('express');

const app = express();
const path  = require('path');
const exphbs = require('express-handlebars');
 
const logger = require('./middleware/logger');
const members =require('./Members');

//Init Middleware
//app.use(logger);
//Handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');





// Body parser middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage route
app.get('/', (req,res) => 
res.render('index', {
    title: 'Member App',
    members
}));

//Members api routes
app.use('/api/members', require('./routes/api/members'));

//static folder

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));