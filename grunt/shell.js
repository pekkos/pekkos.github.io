/**
 *
 * Shell commands
 *
 */

module.exports = {

  // Show current weather
  weather: {
    command: "curl -s http://wttr.in/Gothenburg | head -7"
  },

  // Generate patterns @ Pattern Lab
  patternlab_build: {
    command: "php patterns/core/console --generate"
  },

  // Generate Jekyll site with only 10 posts
  jekyll_build_limited: {
    command: "bundle exec jekyll build --limit_posts 10"
  },

  // Generate full Jekyll site
  jekyll_build_full: {
    command: "bundle exec jekyll build"
  }

};


