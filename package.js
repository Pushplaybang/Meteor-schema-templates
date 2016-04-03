/* eslint-disable */
Package.describe({
  name: 'pushplaybang:schematemplates',
  version: '0.0.1',
  summary: 're-usable autovalue schema templates for meteor aldeed:collection2',
  git: 'https://github.com/Pushplaybang/Meteor-schema-templates',
  documentation: 'readme.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('aldeed:collection2');
  api.addFiles('_namespace.js');
  api.addFiles('templates/dates.js');
  api.addFiles('templates/user.js');
  api.addFiles('templates/history.js');
  api.export('SchemaTemplate');
});


