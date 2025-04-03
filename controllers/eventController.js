const Event = require('../models/userModel');
const User = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  const { title, description, location, date, categories } = req.body;
  try {
    const event = new Event({
      title,
      description,
      location,
      date,
      categories,
      createdBy: req.user,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};

exports.getEvents = async (req, res) => {
  const { radius = 10000, categories } = req.query; // Radius in meters
  try {
    const user = await User.findById(req.user);
    const events = await Event.find({
      location: {
        $near: {
          $geometry: user.location,
          $maxDistance: parseInt(radius),
        },
      },
      ...(categories && { categories: { $in: categories.split(',') } }),
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: req.user },
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ msg: req.__('event_not_found') });
    res.json(event);
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOneAndDelete({ _id: id, createdBy: req.user });
    if (!event) return res.status(404).json({ msg: req.__('event_not_found') });
    res.json({ msg: req.__('event_deleted') });
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, location, date, categories } = req.body;
  try {
    const event = new Event({
      title,
      description,
      location,
      date,
      categories,
      createdBy: req.user,
    });
    await event.save();
    require('./notificationController').scheduleNotification(event);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ msg: req.__('server_error') });
  }
};