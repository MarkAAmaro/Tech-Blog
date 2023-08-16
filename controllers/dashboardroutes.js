const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User }],
        });

        const blogs = blogData.map(blog => blog.get({ plain: true }));

        res.render('dashboard', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error('Dashboard fetch error:', err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
 
});
router.get('/view/:id', withAuth, async (req, res) => {
   
});
console.log('dashboard routes loaded');
module.exports = router;