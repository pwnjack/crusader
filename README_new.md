# Crusader
Front-end development as it should be.

## What it is
Basically is a gulp-based, local, live-preview webserver with built-in live-reload. Made for development of scalable, maintainable and flexible front-end projects.

You can build you project using Jade for HTML templating and Sass for CSS preprocessing, all CSS is structured following OOCSS, SMACSS and BEM techniques.

It also features:

- Bower package installation (including markup injection)
- BrowserSync to live-preview code changes on the fly
- JSHint javascript linting
- CSS maps for Sass debugging
- Code minimization
- Image optimization

## How to set it up
Clone this git on your local machine then move inside it's folder and run:

	npm install

This will install the dev dependencies.

Then go on and install the default Bower packages:

	bower install

## How to use it
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

Once finished the production-ready project will be inside the freshly created /dist folder.
