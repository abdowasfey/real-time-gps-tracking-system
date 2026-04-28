const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { User } = require('../models');
const base = require('./base.controller');
require('dotenv').config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    // التأكد من وجود المفتاح أو استخدام قيمة بديلة مؤقتة لمنع انهيار السيرفر
    const secret = process.env.JWT_SECRET;
    console.log("this is the sec",secret)
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      secret, 
      { expiresIn: '1h' }
    );

    res.json({ token, user: { name: user.name, role: user.role } });
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

exports.createUser = base.create(User);
exports.getUsers = base.getAll(User, ['name', 'email']);