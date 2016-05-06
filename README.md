# Crusader
Front-end development as it should be.

The evil resides within CSS and HTML, poorly scalable and maintainable languages. Crusader comes to the rescue, providing a complete coding environment for your front-end projects. With Crusader you can take the advantages of more versatile and flexible languages like [Jade](http://jade-lang.com) and [Sass](http://sass-lang.com) to make your workflow smooth and more efficient.

Purge the evil from front-end development!

## What it is
Basically is a gulp-based build tool featuring a local webserver with built-in live-reload and Bower to manage dependencies effortlessly.

You can build you project using Jade for HTML templating and Sass for CSS preprocessing, all CSS is structured following OOCSS, SMACSS and BEM techniques.

It features:

- Bower package installation (including markup injection)
- BrowserSync to live-preview code changes on the fly (with cross-device sync!)
- JSHint javascript linting
- CSS maps for Sass debugging
- CSS vendor autoprefixer
- Code minimization
- Image optimization

## Setup
Clone this git on your local machine then move inside it's folder and run:

	npm install

This will install the dev dependencies.

Then go on and install the default Bower packages:

	bower install

## Usage
To start the magic use the command:

	gulp

It will wire-up all your project's dependencies and start the web server while opening your browser on the index page. It will also start watching your files for code changes and refresh the browser in real-time as you save.

To stop the server: CTRL+C

To install a Bower package use the --save option:

	bower install --save package-name

To start the server again run:

	gulp serve

Once satisfied, to start the build task for production: 

	gulp build

When finished the production-ready project will be inside the freshly created `/dist` folder.

To delete all compiled code and the entire `dist` folder, run:

    gulp clean

### F.A.Q.
__Q:__ *Package not present on bower, how can I add it to my dependencies?*

__A:__ Copy-paste it's raw code directly in the `_plugins.scss` file for CSS and inside the `plugins` folder for js

__Q:__ *Package present on Bower but is not pulling the correct file.*

__A:__ Edit `/bower.json` and add an "overrides" entry to specify the needed asset.

__Q:__ *I need to copy also some images and font files for some dependencies, how do I do it?*

__A:__ You can force it to import some extra files, to do so define them in [config.json](https://github.com/pwnjack/crusader/blob/master/config.json). To let it work correctly remember to uncomment the code lines related to `config.json` inside the [gulpfile.js](https://github.com/pwnjack/crusader/blob/master/gulpfile.js).
