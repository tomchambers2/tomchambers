var mongo_string = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds035290.mongolab.com:35290/tomchambers';

var keystone = require('keystone')
keystone.init({
  'name': 'Tom Chambers',
  'views': 'views',
  'view engine': 'jade',
  'static': ['public'],
  'auto update': true,
  'mongo': mongo_string,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cloudinary config': process.env.CLOUDINARY_URL,
  'cookie secret': '123456'
});
require('./models');
keystone.set('routes', require('./routes'));
keystone.start();