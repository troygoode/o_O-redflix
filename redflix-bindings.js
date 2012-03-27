!function(){

  var ViewModel = function(){
    var self = this;

    self.title = o_O.property();
    self.movies = o_O.Collection();
    self.navigationSections = o_O.Collection();
    self.currentSection = o_O.property();

    self.refresh = function(){
      self.title(self.currentSection.title);

      // clear out any movies currently being shown
      self.movies.forEach(function(movie){
        self.movies.remove(movie);
      });

      // add each movie to the collection
      self.currentSection().movies.forEach(function(movie){
        var Movie = o_O.Model(movie);
        self.movies.add(new Movie());
      });
    };
  };

  var Section = o_O.Model({
    state: '',
    title: ''
  },{
    initialize: function(){
      var self = this;

      this.click = function(){
        window.statechart.sendEvent('goto_' + this.state());
      };

      this.classes = o_O.property(function(){
        if(viewmodel.currentSection())
          return viewmodel.currentSection().state === self.state()
            ? 'active'
            : null;
        else
          return null;
      });
    }
  });

  function makeSection(section){
    var s = new Section(section);
    s.movies = section.movies;
    return s;
  }

  var viewmodel = window.viewmodel = new ViewModel();
  viewmodel.navigationSections.add(makeSection(window.sections.suggestions));
  viewmodel.navigationSections.add(makeSection(window.sections.recently_watched));
  viewmodel.navigationSections.add(makeSection(window.sections.new_releases));
  viewmodel.navigationSections.add(makeSection(window.sections.instant_queue));

  //set default navigation section (that is selected when app is first loaded)
  viewmodel.currentSection(window.sections.suggestions);

}();

// kickstart the statechart
window.statechart.initStates('base');
window.statechart.sendEvent('goto_' + window.viewmodel.currentSection().state);
