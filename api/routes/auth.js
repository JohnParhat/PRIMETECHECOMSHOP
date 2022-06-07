const router = require('express').Router();
const { request } = require('express');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
  const body = req.body;
  if (!body.username && !body.password && !body.email) {
    res.status(400).json({
      username: 'missing',
      email: 'missing',
      password: 'missing',
    });
  } else if (req.body.username && req.body.email && req.body.password) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        body.password,
        process.env.PASS_SEC
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    if (!req.body.username) {
      res.status(400).json({
        message: 'username is required',
      });
    } else if (!req.body.email) {
      res.status(400).json({
        message: 'email is required',
      });
    } else if (!req.body.password) {
      res.status(400).json({
        message: 'password is required',
      });
    }
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('Invalid username or password');

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
    console.log('=====>' + originalPassword);
    originalPassword !== req.body.password &&
      res.status(401).json('invalid username or password');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: '1d',
      }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({
      user: { ...others },
      accessToken,
    });
    console.log('======> this is called');
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
