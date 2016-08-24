var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Project = new keystone.List('Project', {
  track: true,
  autokey: {
    from: 'name',
    path: 'slug',
    unique: true
  }	
});
 
Project.add({
    name: { type: Types.Text, required: true, index: true },
    date: { type: Types.Datetime, required: true, default: Date.now },
    type: { type: Types.Relationship, initial: true, ref: 'Type' },
    image: { type: Types.CloudinaryImage },
    github: { type: Types.Url, initial: true },
 	slug: { type: Types.Key }    
});

Project.defaultColumns = 'name, type';
Project.register();
