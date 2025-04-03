const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect();

exports.scheduleNotification = async (event) => {
  const users = await User.find({ preferences: { $in: event.categories } });
  const message = JSON.stringify({
    eventId: event._id,
    title: event.title,
    date: event.date,
  });

  for (const user of users) {
    const delay = event.date - Date.now() - 24 * 60 * 60 * 1000; // Notify 24h before
    if (delay > 0) {
      setTimeout(() => {
        client.publish(`notifications:${user._id}`, message);
      }, delay);
    }
  }
};