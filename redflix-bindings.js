!function(){

  var ViewModel = o_O.Model({
    title: o_O.property()
  }, {
    initialize: function(){
      this.movies = o_O.Collection();
      this.navigationSections = o_O.Collection();
      this.load = function(movies){
        self = this;
        self.movies.forEach(function(movie){
          self.movies.remove(movie);
        });
        movies.forEach(function(movie){
          var Movie = o_O.Model(movie);
          self.movies.add(new Movie());
        });
      };
      this.refresh = function(){
        this.title(this.currentSection.title);
        this.load(this.currentSection.movies);
        this.navigationSections.forEach(function(section){
          section.state.change();
        });
      };
    }
  });

  var Section = o_O.Model({
    state: '',
    title: ''
  }, { initialize: function(){
    this.movies = [];
    this.click = function(){
      window.statechart.sendEvent('goto_' + this.state());
    };
    this.classes = function(){
      return viewmodel.currentSection.state === this.state()
        ? 'active'
        : null;
    };
  }});

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
  viewmodel.currentSection = window.sections.suggestions;

}();

window.statechart.initStates('base');
window.statechart.sendEvent('goto_' + window.viewmodel.currentSection.state);
