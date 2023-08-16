const router = require('express').Router();
const userRoutes = require('./userroutes');
const blogroutes = require('./blogroutes');

router.use('/users', userRoutes);
router.use('/blog', blogroutes);

module.exports = router;
