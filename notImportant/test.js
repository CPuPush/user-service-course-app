const bcrypt = require('bcrypt');

const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const hash = bcrypt.hashSync("test", salt);

const test = bcrypt.compareSync("test", hash);
console.log(hash);
console.log(test);
// true