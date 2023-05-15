"use strict";
const passwordResolver = require("./password");
const rootResolver = Object.assign({}, passwordResolver);
module.exports = rootResolver;
