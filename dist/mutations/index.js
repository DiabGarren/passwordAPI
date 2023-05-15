"use strict";
const passwordMutation = require("./password");
const rootResolver = Object.assign({}, passwordMutation);
module.exports = rootResolver;
