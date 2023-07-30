const router = require('express').Router();

const apiRoutes = require('./apiroutes');
console.log('apiRoutes:', apiRoutes);

const dashboardRoutes = require('./dashboardroutes');
console.log('dashboardRoutes:', dashboardRoutes);

const homeRoutes = require('./homeroutes');
console.log('homeRoutes:', homeRoutes);

const userRoutes = require('./userroutes');
console.log('userRoutes:', userRoutes);

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

module.exports = router;