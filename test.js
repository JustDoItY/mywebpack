const glob = require("glob");
const path = require("path");
const HTMLWEB = require('./node_modules/html-webpack-plugin');

const Entryfiles = glob.sync(`${__dirname}/src/**/index.js`);
const entrys = {};
// for(let file of Entryfiles) {
//   const matchRes = file.match(/src\/(.+\/)*index.js/);
//   console.log(matchRes);
// }

console.log(module.filename);
console.log();

// niosifodo