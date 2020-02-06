const express = require('express');
const router = express.Router();
const passport = require('passport');



const isLogged = (req, res, next) => {
  console.log(req.user);

  if (!req.user) {
    res.redirect('/user/no-permission');
  } else {
    next();
  }
};

router.get('/logged', isLogged, (req, res) => {
  const { photos, displayName } = req.user;
  res.render('logged', { 
    name: displayName, 
    image: photos[0].value
  });
});

router.get('/profile', isLogged, (req, res) => {
    res.send('Profile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  res.send('Settings');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

module.exports = router;
