# Crusader
Front-end development done right.

CSS and HTML have long been plagued by poor scalability and maintainability. But fear not! Crusader is here to save the day, offering a complete coding environment for your front-end projects. With Crusader, you can harness the power of more versatile and flexible languages like Pug and Sass, making your workflow smoother and more efficient.

Banish the evil from front-end development!

## What is Crusader?
Crusader is essentially a [Gulp](http://gulpjs.com)-based build tool that includes a local web server with built-in live-reload and [Bower](http://bower.io) for effortless dependency management.

Using Crusader, you can build your project with Pug for HTML templating and Sass for CSS preprocessing, all while adhering to the principles of [OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss), [SMACSS](https://smacss.com), and [BEM](http://getbem.com) for structured CSS.

Key Features:
- Bower package installation (including markup injection)
- [BrowserSync](http://www.browsersync.io) for live-previewing code changes on the fly (with cross-device sync!)
- JSHint for JavaScript linting
- CSS maps for Sass debugging
- CSS vendor [Autoprefixer](https://github.com/postcss/autoprefixer)
- Code minimization
- Image optimization via [Imagemin](https://github.com/imagemin/imagemin)

## Setup:
1. Clone this Git repository to your local machine and navigate to its folder.
2. Run the following command to install the development dependencies:
   ```
   npm install
   ```
3. Proceed to install the default Bower packages using:
   ```
   bower install
   ```

## Usage:
To witness the magic, simply use the command:
```
gulp
```
This will set up all your project's dependencies and launch the web server while automatically opening your browser on the index page. Additionally, it will watch your files for code changes and refresh the browser in real-time as you save.

To stop the server, press: CTRL+C

To install a Bower package, use the --save option:
```
bower install --save package-name
```

To start the server again, run:
```
gulp serve
```

Once you're satisfied with your project and ready for production, initiate the build task:
```
gulp build
```
The production-ready project will be generated inside the freshly created `dist` folder.

To delete all compiled code and the entire `dist` folder, run:
```
gulp clean
```

### Frequently Asked Questions (FAQs):
__Q:__ *A package is not available on Bower. How can I add it to my dependencies?*
__A__: Simply copy-paste its raw code directly into the _plugins.scss file for CSS or inside the plugins folder for JavaScript.

__Q__: *I found a package on Bower, but it's not pulling the correct file. What should I do?*
__A__: Edit /bower.json and add an "overrides" entry to specify the required asset.

__Q__: *I need to include some additional image and font files for certain dependencies. How can I achieve that?*
__A__: You can force Crusader to import extra files by defining them in [config.json](https://github.com/pwnjack/crusader/blob/master/config.json). To ensure it works correctly, remember to uncomment the code lines related to `config.json` inside the [gulpfile.js](https://github.com/pwnjack/crusader/blob/master/gulpfile.js).
