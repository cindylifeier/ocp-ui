const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('express-http-proxy');
const chalk = require('chalk');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const pxhost = process.env.npm_config_pxhost || 'localhost';
  const pxport = process.env.npm_config_pxport || '8446';
  const proxyLink = `${pxhost}:${pxport}`;
  const proxyRoute = '/ocp-ui-api';
  const check = '✓';
  const cross = '✗';
  if (proxy) {
    app.use(proxyRoute, proxy(proxyLink));
    console.log(`proxy setup:\n\t ${proxyRoute} -> ${proxyLink} ${(chalk && chalk.green(check)) || check}`);
  } else {
    console.log(`proxy setup: ${proxyRoute} -> ${proxyLink} ${(chalk && chalk.red(cross)) || cross}`);
  }

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
