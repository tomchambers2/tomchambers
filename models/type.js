var keystone = require('keystone');
var Types = keystone.Field.Types;

var Type = new keystone.List('Type', {
  track: true,
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  }
});

Type.add({
	name: { type: Types.Text, initial: true },
 	slug: { type: Types.Key }
});

Type.defaultColumns = 'title';
Type.register();