!function(){

  var sections = window.sections = {
    suggestions: {
      state: 'suggestions',
      title: 'Suggestions',
      movies: window.movies.suggestions
    },
    recently_watched: {
      state: 'recently_watched',
      title: 'Recently Watched',
      movies: window.movies.recently_watched
    },
    new_releases: {
      state: 'new_releases',
      title: 'New Releases',
      movies: window.movies.new_releases
    },
    instant_queue: {
      state: 'instant_queue',
      title: 'Instant Queue',
      movies: window.movies.instant_queue
    }
  };

}();
