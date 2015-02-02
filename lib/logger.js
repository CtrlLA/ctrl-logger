/**
 * logger module
 * @module lib/logger
 */

var

  /** options parser */
  argv = require('optimist').argv,

  /** built-in node utilities */
  nodeUtil = require('util'),

  /**
   * node.js event emitter
   * @type {Object}
   */
  EventEmitter = require('events').EventEmitter,

  /**
   * colors module for console
   */
  colors = require('colors'),

  /**
   * server utitlies
   * @type {Object}
   */
  util = require('../lib/util');

/**
 * logger class
 * @param options
 * @constructor
 */
var Logger = function(options) {
  if (!(this instanceof Logger)) {
    return new Logger(options);
  }

  EventEmitter.call(this);

  /**
   * default options for logger
   * @type {Object}
   */
  var defaults = {
    publish: true,
    catch: true,
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    patch: 'cyan',
    level: (function() {
      if (typeof argv.logLevel !== 'undefined') {
        return parseInt(argv.logLevel);
      } else if (typeof process.env.logLevel !== 'undefined') {
        return parseInt(process.env.logLevel);
      } else {
        return 3;
      }
    })(),
    depth: 3
  };

  util.extend(defaults, options || {});

  this.options = {};
  for (var key in defaults) {
    this.options[key] = defaults[key];
  }

  return this;
};

/** javascript prototypical inheritance */
util.inherts(Logger, EventEmitter);

/**
 * printers colored message with prefixed meta
 * @param level
 * @param prefix
 * @param color
 * @param msg
 */
Logger.prototype.print = function(level, prefix, color, msg) {
  if (this.options.level < level) {
    return;
  }

  var args = [], output = [];
  args.push(colors[color](prefix + ' >> ') + (msg || ''));

  if (msg) {
    output.push(msg);
  }

  for (var i = 4, len = arguments.length; i < len; i++) {
    if (typeof arguments[i] === 'string') {
      args.push(arguments[i]);
      output.push(arguments[i]);
    } else {
      var inspected = nodeUtil.inspect(arguments[i], { showHidden: true, depth: this.options.depth });
      args.push(inspected);
      output.push(inspected);
    }
  }

  console.log.apply(this, args);

  if (this.options.publish) {
    this.emit((prefix || 'debug').toLowerCase(), output);
  }
};

/** calls print function with config for formatting */
Logger.prototype.debug = function() {
  var args = [
    3,
    'DEBUG',
    this.options.debug
  ];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  this.print.apply(this, args);
};

/** calls print function with config for formatting */
Logger.prototype.info = function() {
  var args = [
    2,
    'INFO',
    this.options.info
  ];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  this.print.apply(this, args);
};

/** calls print function with config for formatting */
Logger.prototype.warn = function() {
  var args = [
    1,
    'WARN',
    this.options.warn
  ];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  this.print.apply(this, args);
};

/** calls print function with config for formatting */
Logger.prototype.error = function() {
  var args = [
    0,
    'ERROR',
    this.options.error
  ];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  this.print.apply(this, args);
};

/** calls print function with config for formatting */
Logger.prototype.patch = function() {
  var args = [
    2,
    'PATCH',
    this.options.patch
  ];
  for (var i = 0, len = arguments.length; i < len; i++) {
    args.push(arguments[i]);
  }
  this.print.apply(this, args);
};

module.exports = Logger;