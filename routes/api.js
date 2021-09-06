'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const cors = require('cors');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.use(cors({
      origin: '*'
  }));

  app.route('/api/convert').get((req, res) => {
    let result;
    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);
    if (initNum === 'invalid number' && initUnit === 'invalid unit'){
      result = 'invalid number and unit';
    } else if (initUnit === 'invalid unit'){
      result = 'invalid unit';
    } else if (initNum === 'invalid number'){
      result = 'invalid number';
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      result = {
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
       "string": convertHandler.getString(initNum, convertHandler.spellOutUnit(initUnit), returnNum, convertHandler.spellOutUnit(returnUnit))
      };
    }
    res.send(result);
  });
};