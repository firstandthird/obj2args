'use strict';
module.exports = function(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }

  const keys = Object.keys(obj);

  const args = keys.map((key) => {
    const pre = (key.length === 1) ? '-' : '--';
    let values = obj[key];
    if (!(values instanceof Array)) {
      //if its an object, use key=value as the value
      if (typeof values === 'object') {
        values = Object.keys(values).map(valueKey => `${valueKey}=${values[valueKey]}`);
      } else {
        values = [values];
      }
    }

    const arg = values.map((value) => {
      //if value is true, then just output without value
      if (value === true) {
        value = '';
      }
      //if there is a space, add quotes
      if (value.toString().indexOf(' ') !== -1) {
        value = `"${value}"`;
      }
      return `${pre}${key} ${value}`;
    });

    return arg.join(' ').trim();
  });
  return args.join(' ').trim();
};
