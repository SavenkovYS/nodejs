exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[1]
  //   .trim()
  //   .split('=')[1];
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age:10; Secure; Domain=localhost:3000; HttpOnly')
  res.redirect('/');
}