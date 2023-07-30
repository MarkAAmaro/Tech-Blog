const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/login', async (req, res) => {
  
});

router.post('/logout', (req, res) => {
 
});

router.post('/signup', async (req, res) => {
 
});
console.log('user routes loaded');
module.exports = router;