const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

// Create a new blog post
router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(201).json(newBlog);
    } catch (err) {
        console.error("Error creating a new blog post:", err);
        res.status(500).json(err);
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            blog_id: req.params.id, 
            user_id: req.session.user_id
        });
        res.redirect(`/blog/${req.params.id}`);
    } catch (err) {
        console.error("Error creating a new comment:", err);
        res.status(500).json(err);
    }
});

// Update a blog post by id
router.put('/:id', async (req, res) => {  
    try {
        const updatedBlog = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (updatedBlog > 0) {
            res.status(200).json({ message: 'Blog post updated successfully.' });
        } else {
            res.status(404).json({ message: 'Blog post not found.' });
        }
    } catch (err) {
        console.error("Error updating the blog post:", err);
        res.status(500).json(err);
    }
});

// Delete a blog post by id
router.delete('/:id', async (req, res) => {  // Updated this line
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedBlog) {
            res.status(200).json({ message: 'Blog post deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Blog post not found.' });
        }
    } catch (err) {
        console.error("Error deleting the blog post:", err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!blogData) {
            res.status(404).json({ message: 'Blog not found!' });
            return;
        }

        const blog = blogData.get({ plain: true });

        
        blog.comments = blog.comments.map(comment => ({
            ...comment,
            username: comment.User.username
        }));

        res.render('blog', { blog });
    } catch (err) {
        console.error("Error fetching the blog post:", err);
        res.status(500).json(err);
    }
});
console.log('API routes loaded');
module.exports = router;