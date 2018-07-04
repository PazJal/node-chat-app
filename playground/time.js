var moment = require('moment');

var createdAt = 1234;
var someTimestamp = new moment().valueOf();
console.log(someTimestamp);

var date = new moment(createdAt);

console.log(date.format('h:mm A UTC Z'));

