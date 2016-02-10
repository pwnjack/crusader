# Crusader
Purge the evil from frontend development

As we all know evil dwells deeply within CSS and HTML, just poorly scalable and maintainable. Crusader comes in handy, providing a complete coding environment to make static web development as painless as possible. With Crusader you can take the advantages of more versatile languages like [Jade](http://jade-lang.com) and [Sass](http://sass-lang.com) to make your workflow smooth, efficient and flexible.

Crusader also features a local web-server ([BrowserSync](http://www.browsersync.io)) to preview your work while you are developing, and some other interesting features, read on for more information.

## Getting Started
To run Crusader you need all the following softwares installed on your computer.

 - [Node](http://nodejs.org)
 - [Npm](https://www.npmjs.com)
 - [Gulp](http://gulpjs.com)
 - [Bower](http://bower.io)
 - [Git](http://github.com)

To get started clone this repo on your local machine:

	git clone https://github.com/pwnjack/crusader.git

Move inside the newly created "crusader" folder and install the default dev-dependencies:

	cd crusader

	npm install

Then install your project's default dependencies (Modernizr, jQuery, Bootstrap):

 	bower install

To install more dependencies on your project do it via Bower with the --save option, like so:

 	bower install --save font-awesome

Package not present on Bower? Don't worry, have a look at the [Helpers](#helpers) section for a workaround.

## Usage
Once you have defined all your assets you can start to work on your project:

	gulp

This command will open up your favorite browser on the project's index page, and while you work on the code it will auto-refresh the page in real-time to reflect your code's changes (css, js, jade). Try to open the webpage on multiple devices simultaneously and see how they follow your movements cross-device.

To work smoothly Crusader let you build you project using some pre-processors:

- [Jade](http://jade-lang.com) for HTML
- [Sass](http://sass-lang.com) for CSS

Crusader have more nice features:

- Images web-optimization with [Imagemin](https://github.com/imagemin/imagemin)
- CSS vendor-prefixing with [Autoprefixer](https://github.com/postcss/autoprefixer)
- Code minimization for production
- [Bower](http://bower.io) dependencies injection
- Local preview web-server with [BrowserSync](http://www.browsersync.io)

When you have finished developing and your project is ready for production, build it:

	gulp build

Your project's optimized version will be stored in the freshly created "dist" folder.

## Helpers
If you want to install an asset later on, stop the server in your terminal (CTRL+C), install the asset via Bower (as shown above) and then wire it up in your markup:

	gulp wiredep

Then start the server again:

	gulp serve

And you can get back to work on your code.

If you want to install an asset that is not available on Bower you can do it by copy-pasting it's code in to the following files (depending on code language):

- Javascript into "app/plugins/*.js"
- CSS into "app/styles/partials/_plugins.scss"
- For images and fonts you have to add their full path reference into "config.json"

If you need to copy extra fonts and images remember to uncomment the code lines related to [config.json](https://github.com/pwnjack/crusader/blob/master/config.json) inside the [gulpfile.js](https://github.com/pwnjack/crusader/blob/master/gulpfile.js) first.

To delete all compiled code and clean the project's "dist" folder run:

    gulp clean

### Feedback
Thanks for reading, your feedback is much appreciated.
