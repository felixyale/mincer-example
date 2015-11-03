var express = require('express');
var app = express();
var env = process.env.NODE_ENV || 'development';
var ConnectMincer = require('connect-mincer');
var Mincer = require('mincer');
var port = process.env.PORT || 3000;

// set up connect-mincer middleware
var mincer = new ConnectMincer({
  // you can, optionally, pass in your own required Mincer class, so long as it is >= 0.5.0
  mincer: Mincer,
  root: __dirname,
  assetHost: (env === 'production' || env === 'staging') ? 'http://localhost:3000' : '',
  production: env === 'production' || env === 'staging',
  // uncomment to have view helpers generate urls of the form: //assets.example.com/assets/...
  // assetHost: '//assets.example.com',
  // you'll probably want to get this from a environment-specific config, e.g:
  // assetHost: config.get('asset_host')
  mountPoint: (env === 'production' || env === 'staging') ? './' : 'assets',
  manifestFile: __dirname + '/manifest.json',
  paths: [
    'assets'
  ],
  // precompiling can take a long time: when testing, you may want to turn it off
  precompile: env !== 'test'
});

mincer.environment.registerHelper('version', function() {
  return require(__dirname + '/package.json').version;
});

// the main connectMincer middleware, which sets up a Mincer Environment and provides view helpers
app.use(mincer.assets());

if (env === 'production' || env === 'staging') {
  // in production, use the connect static() middleware to serve resources. In a real deployment
  // you'd probably not want this, and would use nginx (or similar) instead
  app.use(express.static(__dirname + '/dist'));
  //app.use(express.static(__dirname + '/public'));
} else {
  // in dev, just use the normal server which recompiles assets as needed
  app.use('/assets', mincer.createServer());
}

app.set('port', port);
app.set('view engine', 'ejs');

//route start
app.get('/', function(req, res) {
  res.render('index.ejs');
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s, environment:%s', port, env);
});
