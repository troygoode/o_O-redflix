!function(){

  var statechart = window.statechart = Stativus.createStatechart();

  statechart.addState('base', {
    enterState: function(){
      o_O.bind(window.viewmodel, '#navigation');
      o_O.bind(window.viewmodel, '#movies');
      $(document).keydown(function(event){
        var key = event.originalEvent.keyIdentifier;
        if(key){
          event.preventDefault();
          var movementKeys = 'Up,Down,Right,Left,Enter';
          if(movementKeys.indexOf(key) > -1){
            statechart.sendEvent('key_' + key.toLowerCase());
            event.preventDefault();
          }
        }
      });
    },
    goto_suggestions: function(){
      this.goToState('suggestions');
    },
    goto_recently_watched: function(){
      this.goToState('recently_watched');
    },
    goto_new_releases: function(){
      this.goToState('new_releases');
    },
    goto_instant_queue: function(){
      this.goToState('instant_queue');
    }
  });

  statechart.addState('suggestions', {
    parentState: 'base',
    enterState: function(){
      window.viewmodel.currentSection(window.sections.suggestions);
      window.viewmodel.refresh();
    },
    key_down: function(){
      this.goToState('recently_watched');
    }
  });

  statechart.addState('recently_watched', {
    parentState: 'base',
    enterState: function(){
      window.viewmodel.currentSection(window.sections.recently_watched);
      window.viewmodel.refresh();
    },
    key_up: function(){
      this.goToState('suggestions');
    },
    key_down: function(){
      this.goToState('new_releases');
    }
  });

  statechart.addState('new_releases', {
    parentState: 'base',
    enterState: function(){
      window.viewmodel.currentSection(window.sections.new_releases);
      window.viewmodel.refresh();
    },
    key_up: function(){
      this.goToState('recently_watched');
    },
    key_down: function(){
      this.goToState('instant_queue');
    }
  });

  statechart.addState('instant_queue', {
    parentState: 'base',
    enterState: function(){
      window.viewmodel.currentSection(window.sections.instant_queue);
      window.viewmodel.refresh();
    },
    key_up: function(){
      this.goToState('new_releases');
    }
  });

}();
