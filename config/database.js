const mongoose = require('mongoose');
const mongoDB = 'mongodb://admin123:admin123@ds151354.mlab.com:51354/mquezada';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
