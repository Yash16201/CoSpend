const { Connection, User, Sequelize } = require('../models');
const { Op } = Sequelize;

exports.send_request_to_connect = async (req, res) => {
  try {
    const { friendId, status } = req.body;
    const { id } = req.user;

    if (!friendId) return res.status(400).json({ message: 'Friend Id is missing' });
    if (!status) return res.status(400).json({ message: 'Status is missing' });
    if (friendId === id) return res.status(400).json({ message: 'You cannot connect with yourself' });

    const existing = await Connection.findOne({
      where: {
        [Op.or]: [
          { userId: id, friendId },
          { userId: friendId, friendId: id },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'pending') return res.status(400).json({ message: 'Connection already pending' });
      if (existing.status === 'accepted') return res.status(400).json({ message: 'Already connected' });
    }

    const newConnection = await Connection.create({ userId: id, friendId, status });
    return res.status(201).json({ message: 'Connection request sent', connection: newConnection });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.get_all_connection_requests = async (req, res) => {
  try {
    const { id } = req.user;
    const requests = await Connection.findAll({
      where: { friendId: id, status: 'pending' },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
    });
    res.status(200).json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approve_request = async (req, res) => {
  try {
    const { requestID } = req.body;
    const { id } = req.user;

    const connection = await Connection.findOne({
      where: { id: requestID, friendId: id, status: 'pending' },
    });

    if (!connection) return res.status(404).json({ message: 'Request not found' });

    connection.status = 'accepted';
    await connection.save();
    res.status(200).json({ message: 'Request approved', connection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.block_user = async (req, res) => {
  try {
    const { friendId } = req.body;
    const { id } = req.user;

    const connection = await Connection.findOne({
      where: {
        [Op.or]: [
          { userId: id, friendId },
          { userId: friendId, friendId: id },
        ],
      },
    });

    if (!connection) return res.status(404).json({ message: 'Connection not found' });

    connection.status = 'blocked';
    await connection.save();

    res.status(200).json({ message: 'User blocked successfully', connection });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.delete_connection = async (req, res) => {
  try {
    const { friendId } = req.body;
    const { id } = req.user;

    const connection = await Connection.findOne({
      where: {
        [Op.or]: [
          { userId: id, friendId },
          { userId: friendId, friendId: id },
        ],
      },
    });

    if (!connection) return res.status(404).json({ message: 'Connection not found' });

    await connection.destroy();
    res.status(200).json({ message: 'Connection deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get_my_all_connections = async (req, res) => {
  try {
    const { id } = req.user;

    const connections = await Connection.findAll({
      where: {
        status: 'accepted',
        [Op.or]: [
          { userId: id },
          { friendId: id },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'friend', attributes: ['id', 'name', 'email'] },
      ],
    });

    res.status(200).json({ connections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get_my_blocked_connections = async (req, res) => {
  try {
    const { id } = req.user;

    const blocked = await Connection.findAll({
      where: {
        status: 'blocked',
        [Op.or]: [
          { userId: id },
          { friendId: id },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'friend', attributes: ['id', 'name', 'email'] },
      ],
    });

    res.status(200).json({ blocked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};