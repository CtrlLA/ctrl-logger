/**
 * utility helper library
 * @module lib/util
 */

var

    /** deep cloning lib */
    extend = require('xtend');

/**
 * prototypical inheritance
 * @param ctor
 * @param superCtor
 * @returns {Object}
 */
exports.inherts = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writeable: true,
            configurable: true
        }
    });
    return ctor;
};

/**
 * extends object a with object b's functions and values
 * @param a {Object} target object
 * @param b {Object} reference object
 */
exports.extend = function(a, b) {
    for (var i = 0, ii = arguments.length; i < ii; i++) {
        if (b) {
            var keys = Object.keys(b);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                a[key] = b[key];
            }
        }
    }

    return a;
};

/**
 * deep clones an object
 * @param obj {*}
 * @returns {*}
 */
exports.clone = function(obj) {
    return extend(obj);
};