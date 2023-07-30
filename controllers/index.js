const router = require('express').Router();

const apiRoutes = require('./apiroutes');
const dashboardRoutes = require('./dashboardroutes');
const homeRoutes = require('./homeroutes');
const userRoutes = require('./userroutes');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;