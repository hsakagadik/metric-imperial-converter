function ConvertHandler() {
  
  this.getNum = function(input) {
    const err = 'invalid number';
    const num = input.toLowerCase().split(/[a-z]/gi)[0]; 
    const hasToEval = num.match(/\//gi);
    if (hasToEval && hasToEval.length === 1){ return parseFloat(eval(num)); }
    if (isNaN(num)){ return err; }
    if (num === '') { return 1; }
    return parseFloat(num);
  };
  
  this.getUnit = function(input) {
    const err = 'invalid unit';
    const supportedUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    const unit = supportedUnits.includes(input.toLowerCase()) ? input.toLowerCase() : input.toLowerCase().split(/[^a-z]+/gi)[1];
    const res = supportedUnits.includes(unit) ? unit : err;
    return res === 'l' ? res.toUpperCase() : res;
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      "gal": "L",
      "l": "gal",
      "mi": "km",
      "km": "mi",
      "lbs": "kg",
      "kg": "lbs"
    };
    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitsString = {
      "gal": "gallon",
      "l": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "pounds",
      "kg": "kilograms"
    };
    return unitsString[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const refUnits = {
      "gal": initNum * 3.78541,
      "l": initNum / 3.78541,
      "mi": initNum * 1.60934,
      "km": initNum / 1.60934,
      "lbs": initNum * 0.453592,
      "kg": initNum / 0.453592
    };
    return parseFloat(refUnits[initUnit.toLowerCase()].toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}` 
  };
  
}

module.exports = ConvertHandler;
