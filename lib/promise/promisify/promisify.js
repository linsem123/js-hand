const util = require('util');
const fs = require('fs');

const promisifyReadFile = util.promisify(fs.readFile);

promisifyReadFile('../model/500miles.txt').then(data => {
  console.log(data.toString());
});