/* eslint-disable */
Package.describe({
  name: 'pushplaybang:schematemplates',
  version: '0.1.4',
  summary: 're-usable autovalue schema templates for meteor aldeed:collection2',
  git: 'https://github.com/Pushplaybang/Meteor-schema-templates',
  documentation: 'readme.md',
});

Npm.depends({
  'simpl-schema': '0.2.2'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('aldeed:collection2-core@2.0.0');
  api.use('aldeed:schema-deny@2.0.0');
  api.use('aldeed:schema-index@2.0.0');
  api.addFiles('_namespace.js');
  api.addFiles('templates/dates.js');
  api.addFiles('templates/user.js');
  api.addFiles('templates/history.js');
  api.export('SchemaTemplate');
});


