const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/signup', async (req, res) => { 
  console.log('Signup route hit');
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.redirect('/dashboard'); 
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('Login route hit with username:', req.body.username);

  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      console.log('No user found with that username:', req.body.username);
      return res.status(400).json({ message: 'No user with that username!' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      console.log('Incorrect password provided for username:', req.body.username);
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      res.redirect('/dashboard'); 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  return res.redirect('/dashboard');
});

router.post('/logout', (req, res) => {
  console.log('Logout route hit');

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log('Error: User tried to logout but was not logged in.');
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  console.log('Homepage route hit');

  if (req.session.logged_in) {
    console.log('Logged in user redirected to dashboard.');
    return res.redirect('/dashboard'); 
  }
  
  try {
    const blogsData = await Blog.findAll();
    const blogs = blogsData.map(blog => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Homepage fetch error:', err);
    res.status(500).json(err);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User }],
    });

    const blogs = blogData.map(blog => blog.get({ plain: true }));

    res.render('dashboard', {  
      blogs,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json(err);
  }
});

module.exports = router;