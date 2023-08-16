const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const dashboardRoutes = require('./controllers/dashboardroutes.js');  // Added this line
const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

let sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const hbs = exphbs.create({ helpers });
console.log('Initializing session middleware');
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('Attaching main route middleware');
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  console.log(`Starting server on port ${PORT}`);
  app.listen(PORT, () => console.log('Server successfully started and now listening'));
}).catch(err => {
  console.log('Error while syncing with sequelize:', err);
});