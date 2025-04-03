const User = require('../models/eventModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password, location, preferences, language } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: req.__('user_exists') });

    user = new User({
      email,
      password,
      location: location || { coordinates: [0, 0] },
      preferences: preferences || [],
      language: language || 'en',
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};

exports.login = async req => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: req.__('invalid_credentials') });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, language: user.language });
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};