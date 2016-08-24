var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

var markdown = require('marked');    

var Project = keystone.list('Project');
var Type = keystone.list('Type');

keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});
 
// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    console.error(err)
    res.err(err, title, message);
});
 
// Load Routes
var routes = {
    views: importRoutes('../views')
};

 
// Bind Routes
exports = module.exports = function(app) {
    
    // app.get('/', routes.views.index);

    app.get('/', function(req, res) {
        res.render('index', { title: 'Tom Chambers', page: 'index' });
    }); 

    app.get('/projects', function(req, res, next) {
        var view = new keystone.View(req, res);

        view.on('init', function(next) {
            Project.model.find({})
            .sort('date')
            .exec().then(function(result) {
                res.locals.projects = result;

                Type.model.find({})
                .exec().then(function(result) {
                    res.locals.types = result;
                    next();
                },function(err) {
                    next(err);
                });

            }, function(err) {
                next(err);
            });
        });

        res.locals.title = "Tom D. Chambers' projects";
        res.locals.page = "projects";
        res.locals.sites = "docs";

        view.render('projects');
    });

    app.get('/projects/:slug([0-9a-zA-Z]*)', function(req, res, next) {
        var view = new keystone.View(req, res);

        view.on('init', function(next) {
            Project.model.findOne({ slug: req.params.slug })
            .exec().then(function(result) {
                if (result) {
                    res.locals.project = result;
                    res.locals.project.description = markdown(res.locals.project.description);
                } else {
                    res.notfound();
                }
                next();
            }, function(err) {
                next(err);
            });
            
        });

        view.render('project');
    });

    app.get('/contact', function(req, res) {
      res.render('contact', { title: 'Tom Chambers', page: 'contact' });
    });     
    
}