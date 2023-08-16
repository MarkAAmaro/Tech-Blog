const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup'); 
});

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('home', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    console.error('Error in "/" route:', err);
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { 
          model: User 
        },
        { 
          model: Comment,
          attributes: ['comment_text', 'createdAt'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });

    if (!blogData) {
      console.error('No blog found with this id:', req.params.id);
      res.status(404).render('404-page');  
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blog', { blog, logged_in: req.session.logged_in });

  } catch (err) {
    console.error('Error in "/blog/:id" route:', err);
    res.status(500).json(err);
  }
});

console.log('home routes loaded');
module.exports = router;

