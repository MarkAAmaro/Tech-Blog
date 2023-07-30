const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  
});

router.get('/edit/:id', withAuth, async (req, res) => {
 
});
console.log('dashboard routes loaded');
module.exports = router;