!function(){

  var ViewModel = function(){
    this.navigationSections = o_O.collection();
    this.currentSection = o_O();
  };

  var NavSection = function(section){
    var self = this;

    self.state = o_O(section.state);
    self.title = o_O(section.title);
    self.movies = o_O(section.movies);

    self.classes = o_O(function(){
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
