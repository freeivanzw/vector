const express = require('express');
const { engine } = require('express-handlebars');
const fileupload = require("express-fileupload");
const xPoveredDisabled = require('./xPoveredDisabled');

const path = require('path');

module.exports = (app) => {
  app.use(express.json());
  app.use(xPoveredDisabled);

  app.use(express.static(path.join(__dirname, '..', 'static')));
  app.use(fileupload());

  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, '..', 'views'));
};