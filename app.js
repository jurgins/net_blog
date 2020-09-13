const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouters = require('./routes/blogRouters');

//express app
const app = express();

//connection with mongoDB Atlas
const dbURI = 'mongodb+srv://helena:Elena1110110@cluster0.mhxat.mongodb.net/nodeTutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//middleware
app.use(morgan('tiny'));
//middleware to get data as object
app.use(express.urlencoded({extended: true}));
//middleware & static files
app.use(express.static('public'));

//register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

//about routes
app.get('/about', (req, res) => {
  res.render('about', { title: 'About'});
});

//blogs routes
app.use('/blogs', blogRouters);

//404 page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});

