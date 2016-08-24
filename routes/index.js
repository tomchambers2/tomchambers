var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);

var Project = keystone.list('Project');

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
                next();
            }, function(err) {
                next(err);
            });
        });

        res.locals.title = "Tom D. Chambers' projects";
        res.locals.page = "projects";
        res.locals.sites = "docs";

        view.render('projects');
    });

    app.get('/portfolio', function(req, res, next) {
      var db = req.db;
      var collection = db.collection('portfolioSites');
      collection.find({},{ sort: { order: 1 }}).toArray(function(e,docs){
        if (e) return next(e);
        res.render('portfolio', { title: 'Tom Chambers web portfolio', page: 'portfolio', sites: docs });
      })
    });

    app.get('/contact', function(req, res) {
      res.render('contact', { title: 'Tom Chambers', page: 'contact' });
    });     
    
}