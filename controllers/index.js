const router = require('express').Router();
const blogroutes = require('./API/blogroutes');

const apiRoutes = require('./API');
const dashboardRoutes = require('./dashboardroutes');
const homeRoutes = require('./homeroutes');

router.use('/blog', blogroutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;