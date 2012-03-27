!function(){

  var ViewModel = function(){
    this.navigationSections = o_O.Collection();
    this.currentSection = o_O.property();
  };

  var NavSection = function(section){
    var self = this;

    self.state = o_O.property(section.state);
    self.title = o_O.property(section.title);
    self.movies = o_O.property(section.movies);

    self.classes = o_O.property(function(){
      if(window.viewmodel.currentSection())
        return window.viewmodel.currentSection().state === self.state()
          ? 'active'
          : null;
      else
        return null;
    });

    self.click = function(){
      window.statechart.sendEvent('goto_' + self.state());
    };
  };

  var viewmodel = window.viewmodel = new ViewModel();

  // add navigation sections to viewmodel
  viewmodel.navigationSections.add(new NavSection(window.sections.suggestions));
  viewmodel.navigationSections.add(new NavSection(window.sections.recently_watched));
  viewmodel.navigationSections.add(new NavSection(window.sections.new_releases));
  viewmodel.navigationSections.add(new NavSection(window.sections.instant_queue));

  // set default navigation section (that is selected when app is first loaded)
  viewmodel.currentSection(window.sections.suggestions);

}();

// kickstart the statechart
window.statechart.initStates('base');
window.statechart.sendEvent('goto_' + window.viewmodel.currentSection().state);
