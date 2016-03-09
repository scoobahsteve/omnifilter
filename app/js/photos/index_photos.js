module.exports = function(app) {

  require('./controllers/photos_controller')(app); //CRUD for photos, in scope

  require('./directives/photo_display_directive')(app);//used in transclude example
  require('./directives/photo_form_directive')(app);//points to html template
};
