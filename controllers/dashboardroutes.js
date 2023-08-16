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
    // Logic for fetching the specific blog post for editing.
    // For example, render an edit view with the blog post data.
});
router.get('/view/:id', withAuth, async (req, res) => {
    // fetch the blog post using the id from req.params.id
    // fetch all comments associated with the blog
    // render a new handlebars view with the blog and comments data
});
console.log('dashboard routes loaded');
module.exports = router;