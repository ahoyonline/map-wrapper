Package.describe({
  name: 'ahoy:map-wrapper',
  version: '0.0.1',
  summary: 'A library to wrap map components',
  git: 'https://github.com/ahoyonline/map-wrapper.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['templating'], 'client');
  api.addFiles(['map-wrapper.html', 'map-wrapper.js'], 'client');
  api.export('MapWrapper', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ahoy:map-wrapper');
  api.addFiles('map-wrapper-tests.js');
});