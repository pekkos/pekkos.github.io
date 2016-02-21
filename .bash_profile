#   Jekyll stuff
alias publish_blog="cd ~/code/pekkos.com; bundle exec jekyll b;cp -r ~/code/pekkos.com/_site/* ~/code/pekkos.github.io;cd ~/code/pekkos.github.io;git add .;git commit -am 'Latest build.';git push"
alias pub="publish_blog"
