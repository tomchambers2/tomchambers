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
    oneliner: { type: Types.Text, required: true, initial: true },
    description: { type: Types.Textarea },
    date: { type: Types.Datetime, required: true, default: Date.now },
    type: { type: Types.Relationship, initial: true, ref: 'Type' },
    image: { type: Types.CloudinaryImage },
    images: { type: Types.CloudinaryImages },
    github: { type: Types.Url },
    video: { type: Types.Url },
    link: { type: Types.Url },
    video_embed: { type: Types.Embedly, from: 'video' },
 	slug: { type: Types.Key }    
});

Project.defaultColumns = 'name, type';
Project.register();
