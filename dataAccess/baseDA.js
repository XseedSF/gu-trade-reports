var config = require('config');
const sqlConfig = config.get('sqlConfig');

class BaseDA {
  constructor(ambient) {
    this.sqlConfig = sqlConfig[ambient];
  }

}

module.exports = BaseDA;