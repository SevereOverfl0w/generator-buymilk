'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var fs = require('fs');
var url = require('url');


var BuymilkGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Buymilk generator!'));

    var prompts = [{
      type: 'input',
      name: 'store_url',
      message: 'What is your store URL?',
      default: 'http://example.buycraft.net/'
    }];

    this.prompt(prompts, function (props) {
      this.store_url = url.parse(props.store_url);

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    var store_url = this.store_url;

    this.fetch(this.store_url.href, 'app', function() {
        var indexHtml = fs.readFileSync('app/' + store_url.hostname)
                          .toString()
                          .replace(/\/assets/g, store_url.href + "assets") // Replace assets with store ones
                          .replace(/theme\/style\?cache=\d+/g, 'styles/main.css'); // Inject our custom css appropriately.
        fs.writeFileSync('app/index.html', indexHtml);
        fs.unlink('app/' + store_url.hostname);
    });

    this.template('_package.json', 'package.json');
    this.template('_Gulpfile.js', 'Gulpfile.js');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  method3: function() {
    console.log('This is a deep deep test');
  }
});

module.exports = BuymilkGenerator;
