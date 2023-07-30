const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.post('/blog', async (req, res) => {
  
});

router.post('/comment', async (req, res) => {
  
});

router.put('/blog/:id', async (req, res) => {

});

router.delete('/blog/:id', async (req, res) => {

});
console.log('API routes loaded');
module.exports = router;