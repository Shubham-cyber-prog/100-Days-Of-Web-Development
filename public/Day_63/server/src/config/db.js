const mongoose = require('mongoose');

function connectDB(uri) {
  mongoose.set('strictQuery', true);
  return mongoose.connect(uri, { autoIndex: true });
}

module.exports = connectDB;