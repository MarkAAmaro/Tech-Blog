const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });

    console.log('Raw Blog Data:', blogData);

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    console.log('Plain Blog Data:', blogs);

    res.render('home', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log('Error in "/" route:', err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    console.log('Raw Blog Data:', blogData);

    if (!blogData) {
      console.log('No blog found with this id:', req.params.id);
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });

    console.log('Plain Blog Data:', blog);

    res.render('blog', { 
      blog, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log('Error in "/blog/:id" route:', err);
    res.status(500).json(err);
  }
});
console.log('home routes loaded');
module.exports = router;



