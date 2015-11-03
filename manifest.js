#!/usr/bin/env node
'use strict';

//
// Require some modules
//

var Mincer = require('mincer');
var path   = require('path');
var fs = require('fs');
var wrench = require('wrench');
var assetPath = path.join(__dirname, 'dist');

//
// Get Mincer environment
//
var environment = require('./environment');

//
// Create and compile Manifest
//
var manifest = new Mincer.Manifest(environment, assetPath);

// remove existing manifest/assets if it exists
if (fs.existsSync('./dist')) {
  wrench.rmdirSyncRecursive('./dist');
}

try {
  var assetsData = manifest.compile(['*', '*/**'], {
    compress: true,
    sourceMaps: true,
    embedMappingComments: true
  });

  fs.rename(path.join(assetPath, 'manifest.json'), path.join(__dirname, 'manifest.json'));

  /*eslint-disable no-console*/
  console.info('\n\nAssets were successfully compiled.\n' +
               'Manifest data (a proper JSON) was written to:\n' +
               manifest.path + '\n\n');
  console.dir(assetsData);
} catch (err) {
  console.error('Failed compile assets: ' + (err.message || err.toString()));
}
