function withAuth(req, res, next) {
  console.log(req.session); 
  console.log('Executing withAuth middleware. Session:', req.session);
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
}
  
  module.exports = withAuth;