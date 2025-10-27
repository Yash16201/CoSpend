const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    if(!name){
        return res.status(400).json({ message: 'Please enter name' });
    }
    if(!email){
        return res.status(400).json({ message: 'Please enter email' });
    }
    if(!password){
        return res.status(400).json({ message: 'Please enter password' });
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUserPhone = await User.findOne({ where: { phone:phone } });

    if (existingUserPhone) {
      return res.status(400).json({ message: 'Phone already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id, name:user.name ,email: user.email }, process.env.JWT_SECRET);

    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginByEmail = async (req, res) => {
  const { email, password } = req.body;

  try {
    if(!email){
        return res.status(400).json({ message: 'Please enter email' });
    }
    if(!password){
        return res.status(400).json({ message: 'Please enter password' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email doesnt exist' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, name:user.name ,email: user.email }, process.env.JWT_SECRET);

    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginByPhone = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if(!phone){
        return res.status(400).json({ message: 'Please enter email' });
    }
    if(!password){
        return res.status(400).json({ message: 'Please enter password' });
    }

    const user = await User.findOne({ where: { phone: phone } });
    if (!user) return res.status(404).json({ message: 'Phone number doesnt exist' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id, name:user.name ,email: user.email }, process.env.JWT_SECRET);

    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};