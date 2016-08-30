const fs = require('fs');

module.exports = helpers = {

  parseDataPointArray: (array) => {
    let result = [],
    tmp = '',
    i;

    for (i = 0; i < array.length; i++) {

      if (array[i] !== ' ' && array[i] !== '') {
        tmp += array[i];
      } else if (!!tmp) {
        result.push(tmp);
        tmp = '';
      } else {
        tmp = '';
      }
    }
    return result;
  }

};
