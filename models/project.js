var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Project = new keystone.List('Project');
 
Project.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true },
    canAccessKeystone: { type: Boolean, initial: true }
});
 
Project.register();