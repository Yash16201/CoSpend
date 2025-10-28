const { User } = require('../models');

exports.get_profile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ where: { id: id } });

    if(user === null){
        res.status(400).json({ message: 'User not found' });
    }

    res.status(201).json({ user: { id: user.id, name: user.name, userName: user.userName, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update_profile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, phone } = req.body;

    const user = await User.findOne({ where: { id: id } });

    if(user === null){
        res.status(400).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.status(201).json({ user: { id: user.id, name: user.name, userName:user.userName, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

